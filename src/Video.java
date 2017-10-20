import java.util.ArrayList;
import java.util.Map;

/**
 * Created by lucky on 17-10-18.
 */
public class Video {

    private String name;
    private Key key;
    private ArrayList<String> m3u8;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Key getKey() {
        return key;
    }

    public void setKey(Key key) {
        this.key = key;
    }

    public ArrayList<String> getM3u8() {
        return m3u8;
    }

    public void setM3u8(ArrayList<String> m3u8) {
        this.m3u8 = m3u8;
    }
}

