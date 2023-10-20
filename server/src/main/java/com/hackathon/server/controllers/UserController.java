package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserDTO;
import com.hackathon.server.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("users")
public class UserController {

    /*
    * TODO:
    *  GET getAllUsers
       GET getUserById
       POST addUser
       POST authenticateUser
       DELETE deleteUser
       PUT updateUser
*/

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return new ResponseEntity<>(this.userService.findAllCustomers(), HttpStatus.FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user,HttpStatus.FOUND);
    }

    @PostMapping("/addUser")
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO){
        User addUser = userService.addUser(userDTO);
        return addUser != null ? new ResponseEntity<>(addUser, HttpStatus.CREATED) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<User> authenticateUser(@RequestBody LoginForm loginForm){
        User checkUser = userService.checkCredentials(loginForm.getEmail(),loginForm.getPassword());
         return checkUser != null ? new ResponseEntity<>(checkUser,HttpStatus.ACCEPTED) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id){
        User deleteUser = userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.GONE);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updateUser = userService.updateUser(id,user.getName(),user.getDateOfBirth(),user.getPassword(),user.getGender(),user.getEmail());
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    }

    // post and put will be needed for sending profile picture from front end one for create new user and one for update user
    // get will be needed for sending profile picture to the front end

    @Value("${upload.path}") // Configure the path to save files in your application.properties
    private String uploadPath;

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("profilePicture") MultipartFile file) {
        try {
            // Generate a unique filename for the uploaded image to avoid conflicts
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();

            // Save the file to the specified upload path
            Files.copy(file.getInputStream(), Paths.get(uploadPath, fileName), StandardCopyOption.REPLACE_EXISTING);

            // do the database user link here

            return ResponseEntity.ok("Profile picture uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload profile picture.");
        }
    }

//-----------------------------------------------------------------------------------------------------------------------------

    private static final String UPLOAD_PATH = "profilePhoto/";

    @PostConstruct
    public void init() {
        File uploadDirectory = new File(UPLOAD_PATH);
        if (!uploadDirectory.exists()) {
            if (uploadDirectory.mkdirs()) {
                System.out.println("Directory created successfully");
            } else {
                System.err.println("Failed to create directory");
            }
        }
    }

//    private String getUploadDirectory() {
//        String currentWorkingDirectory = System.getProperty("user.dir");
//        return currentWorkingDirectory + File.separator + UPLOAD_PATH;
//    }

    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<String> handleFileUpload(@RequestParam("image") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);
        try {
            File destination = new File(userService.getUploadDirectory() + fileName);
            file.transferTo(destination);
            System.out.println(destination);

            // do the database user link here

            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
