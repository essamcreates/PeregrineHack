package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.configurations.PropertiesConfig;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserDTO;
import com.hackathon.server.services.UserService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.concurrent.CompletableFuture;

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

    @PostConstruct
    public void init() {
        File uploadDirectory = new File(PropertiesConfig.getParentDirectory());
        if (!uploadDirectory.exists()) {
            if (uploadDirectory.mkdirs()) {
                System.out.println("Directory created successfully");
            } else {
                System.err.println("Failed to create directory");
            }
        }
    }

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


    @PostMapping("/upload")
    @CrossOrigin
    public ResponseEntity<String> handleProfilePhotoUpload(@RequestParam("image") MultipartFile file) {
        String fileName = file.getOriginalFilename();
        System.out.println(fileName);

        try {
            File destination = new File(userService.getUploadDirectory() + fileName);
            file.transferTo(destination);
            System.out.println(destination);
           // System.out.println(PropertiesConfig.getResourceHandlerUrl());


            // Use CompletableFuture to execute the updateProfilePhoto method asynchronously
            CompletableFuture<Void> uploadAndProcess = CompletableFuture.runAsync(() -> {
                try {
                    // Delay the execution until the image is successfully loaded
                    userService.updateProfilePhoto(fileName);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            });

            // Wait for the asynchronous task to complete
            uploadAndProcess.get();

            return ResponseEntity.ok("File uploaded successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



}
