import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import okhttp3.*;

import java.io.*;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * Created by lucky on 17-10-18.
 */
public class Main {

    public static String base="/home/lucky/video/";
    public static String dirname="3D灯光系统之基础篇";


    public static void shell(String name)
    {
        String shell =base + "convert.sh";
        String pwd=base+name;
        String key=pwd+"/key";
        String video=pwd+"/"+name;
        String output=base+name;
        String finalfile=base+dirname+"/"+name;
        String cmd="bash "+shell+" "+key+" "+video+" "+output+" "+finalfile;
        System.out.println(cmd);
        File out=new File(finalfile+".mp4");
        if(out.exists())
            out.delete();
        InputStreamReader stdISR = null;
        InputStreamReader errISR = null;
        Process process=null;
        try {
            String line=null;
            process=Runtime.getRuntime().exec(cmd);
            int exitValue = process.waitFor();
            stdISR = new InputStreamReader(process.getInputStream());
            BufferedReader stdBR = new BufferedReader(stdISR);
            while ((line = stdBR.readLine()) != null) {
                System.out.println("STD line:" + line);
            }

            errISR = new InputStreamReader(process.getErrorStream());
            BufferedReader errBR = new BufferedReader(errISR);
            while ((line = errBR.readLine()) != null) {
                System.out.println("ERR line:" + line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {

                try {
                    if (stdISR != null) {
                        stdISR.close();
                    }
                    if (errISR != null) {
                        errISR.close();
                    }
                    if (process != null) {
                        process.destroy();
                    }
                    File file=new File(video);
                    if(file.exists())
                        file.delete();
                    file =new File(key);
                    if(file.exists())
                        file.delete();
                    file=new File(output+".ts");
                    if(file.exists())
                        file.delete();
                    file=new File(pwd);
                    if(file.exists())
                        file.delete();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }


    public static class MyMerge implements Runnable
    {
        private String furl="";
        private String floader="";
        private ArrayList<String> ts;
        private CountDownLatch count;
        public MyMerge(ArrayList<String> urls,String floader,String name,CountDownLatch count)
        {
            this.floader=floader;
            this.furl=name;
            this.count=count;
            ts=new ArrayList<>();
            for(String url : urls)
            {
                int k=url.lastIndexOf("/");
                String s=url.substring(k+1);
                ts.add(s);
            }
        }

        @Override
        public void run() {
            try {
                System.out.println(furl+" start merge");
                FileOutputStream fops=new FileOutputStream(floader+"/"+furl);
                for(String f : ts)
                {
                    File file=new File(floader+"/"+f);
                    FileInputStream fins=new FileInputStream(file);
                    byte[] buffer=new byte[2048];
                    int len=0;
                    while((len=fins.read(buffer))!=-1)
                    {
                        fops.write(buffer,0,len);
                    }
                    fops.flush();
                    fins.close();
                    if(file.exists())
                        file.delete();
                }
                fops.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            finally {
                System.out.println(furl+" merge complete");
                shell(furl);
                count.countDown();
            }

        }
    }

    public static class MyDownload implements Callback
    {

        private String furl="";
        private String strurl="";
        private CountDownLatch count;
        private OkHttpClient client;
        public MyDownload(String u,String floader,CountDownLatch c,OkHttpClient http)
        {
            strurl=u;
            int k=strurl.lastIndexOf("/");
            String s=strurl.substring(k+1);
            furl+=floader+File.separator+s;
            count=c ;
            client=http;
        }

        @Override
        public void onFailure(Call call, IOException e) {

            if(e.getCause().equals(SocketTimeoutException.class))
            {
                try {
                    Thread.sleep(5000);
                } catch (InterruptedException e1) {
                    e1.printStackTrace();
                }
                client.newCall(call.request()).enqueue(this);
            }
        }

        @Override
        public void onResponse(Call call, Response response) throws IOException {

            InputStream in = response.body().byteStream();
            File file = new File(furl);
            if(file.exists())
                file.delete();
            FileOutputStream fops = new FileOutputStream(file);
            byte[] buffer = new byte[1024];
            int len = 0;
            while ((len = in.read(buffer)) != -1) {
                fops.write(buffer, 0, len);
            }
            count.countDown();
        }
    }

    public static class MyWork implements Runnable
    {
        private Video v;
        private ThreadPoolExecutor merger;
        private OkHttpClient okHttpClient;
        private CountDownLatch countDownLatch;
        public MyWork(Video video,OkHttpClient http,ThreadPoolExecutor m,CountDownLatch c)
        {
            v=video;
            okHttpClient=http;
            merger=m;
            countDownLatch=c;
        }

        @Override
        public void run() {

            String name=v.getName();
            System.out.println(name +" start download");
            v.getKey().getByteArray();

            File subdir=new File(base+name);
            if(!subdir.exists())
                subdir.mkdirs();

            File keyf=new File(subdir.getAbsolutePath()+"/key");
            if(keyf.exists())
                keyf.delete();
            try {
                FileOutputStream fw=new FileOutputStream(keyf);
                fw.write(v.getKey().ca);
                fw.flush();
                fw.close();
            } catch (IOException e) {
                e.printStackTrace();
            }

            CountDownLatch count=new CountDownLatch(v.getM3u8().size());

            for(String url : v.getM3u8())
            {
                Request.Builder requestBuilder = new Request.Builder().url(url);
                requestBuilder.method("GET",null);
                Request request = requestBuilder.build();
                Call mcall= okHttpClient.newCall(request);
                mcall.enqueue(new MyDownload(url,subdir.getAbsolutePath(),count,okHttpClient));
            }

            try {
                count.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println(name +" Download Complete");
            MyMerge m=new MyMerge(v.getM3u8(),subdir.getAbsolutePath(),name,countDownLatch);
            merger.submit(m);

        }
    }

    public static void main(String[] argv)
    {
        int minp=Runtime.getRuntime().availableProcessors();
        int maxp=minp*3+1;

        File dir=new File(base+dirname);
        if(!dir.exists())
            dir.mkdirs();

        File jsonf=new File(base+"json");
        StringBuilder sb=new StringBuilder();
        try {
            BufferedReader br=new BufferedReader(new FileReader(jsonf));
            String s="";
            while((s=br.readLine())!=null)
            {
                sb.append(s);
            }
            br.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Gson gson=new Gson();
        Type type = new TypeToken<ArrayList<Video>>() {}.getType();
        ArrayList<Video> alv=gson.fromJson(sb.toString(),type);

        OkHttpClient mOkHttpClient=new OkHttpClient();
        ThreadPoolExecutor MergePoolExecutor=new ThreadPoolExecutor(minp/2,maxp,101, TimeUnit.SECONDS,new LinkedBlockingDeque<>());
        ThreadPoolExecutor WorkerPoolExecutor=new ThreadPoolExecutor(minp/2,maxp,101, TimeUnit.SECONDS,new LinkedBlockingDeque<>());

        CountDownLatch countDownLatch=new CountDownLatch(alv.size());

        for(Video v : alv)
        {

            WorkerPoolExecutor.submit(new MyWork(v,mOkHttpClient,MergePoolExecutor,countDownLatch));
        }

        try {
            countDownLatch.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("mission complete");

        WorkerPoolExecutor.shutdown();
        MergePoolExecutor.shutdown();
        mOkHttpClient.dispatcher().executorService().shutdown();
        mOkHttpClient.connectionPool().evictAll();


    }

}
