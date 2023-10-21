package com.hackathon.server.configurations;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PropertiesConfig  {
    private static final String UPLOAD_PATH = "profilePhoto/";
   private static final String currentWorkingDirectory = System.getProperty("user.dir");
   private static final Path currentDirectory = Paths.get(currentWorkingDirectory);
   private static final Path parentDirectory = currentDirectory.getParent();
   private static final String RESOURCE_HANDLER_URL = "file:" + parentDirectory + File.separator + UPLOAD_PATH;

    private static final String DEFAULT_PROFILE_PHOTO = "images/stockUser.jpeg";

    public static String getUploadPath() {
        return UPLOAD_PATH;
    }

    public static String getResourceHandlerUrl() {
        return RESOURCE_HANDLER_URL;
    }

    public static String getParentDirectory() {
        return (parentDirectory.toString()+File.separator+UPLOAD_PATH);
    }

    public static String getDefaultProfilePhoto() {
        return DEFAULT_PROFILE_PHOTO;
    }

    //Completed profilePicture version

}
