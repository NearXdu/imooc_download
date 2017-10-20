import com.google.gson.annotations.SerializedName;

/**
 * Created by lucky on 17-10-18.
 */
public class Key {

    @SerializedName("0")
    public int key0;

    @SerializedName("1")
    public int key1;

    @SerializedName("2")
    public int key2;

    @SerializedName("3")
    public int key3;

    @SerializedName("4")
    public int key4;

    @SerializedName("5")
    public int key5;

    @SerializedName("6")
    public int key6;

    @SerializedName("7")
    public int key7;

    @SerializedName("8")
    public int key8;

    @SerializedName("9")
    public int key9;

    @SerializedName("10")
    public int key10;

    @SerializedName("11")
    public int key11;

    @SerializedName("12")
    public int key12;

    @SerializedName("13")
    public int key13;

    @SerializedName("14")
    public int key14;

    @SerializedName("15")
    public int key15;

    public transient byte[] ca=new byte[16];

    public void getByteArray()
    {
        ca[0]=(byte)key0;
        ca[1]=(byte)key1;
        ca[2]=(byte)key2;
        ca[3]=(byte)key3;
        ca[4]=(byte)key4;
        ca[5]=(byte)key5;
        ca[6]=(byte)key6;
        ca[7]=(byte)key7;
        ca[8]=(byte)key8;
        ca[9]=(byte)key9;
        ca[10]=(byte)key10;
        ca[11]=(byte)key11;
        ca[12]=(byte)key12;
        ca[13]=(byte)key13;
        ca[14]=(byte)key14;
        ca[15]=(byte)key15;
    }

    public String toString()
    {
        getByteArray();
        StringBuilder sb=new StringBuilder();
        for(Byte c : ca)
            sb.append(c);
        return sb.toString();
    }

}
