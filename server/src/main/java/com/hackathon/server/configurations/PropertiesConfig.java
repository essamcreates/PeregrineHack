package com.hackathon.server.configurations;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class PropertiesConfig  {

    private static final String UPLOAD_PATH = "profilePhoto/";

//    private static final String UPLOAD_PATH = "src/main/resources/static/profilePhoto/";

   private static final String currentWorkingDirectory = System.getProperty("user.dir");
   private static final Path currentDirectory = Paths.get(currentWorkingDirectory);
   private static final Path parentDirectory = currentDirectory.getParent();

    private static final String RESOURCE_HANDLER_URL = parentDirectory + File.separator + UPLOAD_PATH;


    public static String getUploadPath() {
        return UPLOAD_PATH;
    }

//    public static String getRelativePath() {
//        return RELATIVE_PATH;
//    }

    public static String getResourceHandlerUrl() {
        return RESOURCE_HANDLER_URL;
    }


}
