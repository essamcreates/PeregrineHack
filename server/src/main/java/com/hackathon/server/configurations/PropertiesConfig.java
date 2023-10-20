package com.hackathon.server.configurations;

public class PropertiesConfig  {
    private static final String UPLOAD_PATH = "src/main/resources/static/profilePhoto/";
    private static final String RELATIVE_PATH = "/profilePhoto/";


    // Getter method for UPLOAD_PATH
    public static String getUploadPath() {
        return UPLOAD_PATH;
    }

    public static String getRelativePath() {
        return RELATIVE_PATH;
    }


}
