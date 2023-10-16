package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserDTO;
import com.hackathon.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody UserDTO userDTO){
        User addUser = userService.addUser(userDTO);
        return new ResponseEntity<>(addUser, HttpStatus.CREATED);
    }

    @PostMapping("/authenticate")
    public ResponseEntity<User> authenticateUser(@RequestBody LoginForm loginForm){
        User checkUser = userService.checkCredentials(loginForm.getEmail(),loginForm.getPassword());
         return checkUser != null ? new ResponseEntity<>(checkUser,HttpStatus.ACCEPTED) : new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/id")
    public ResponseEntity<User> deleteUser(@PathVariable Long id){
        User deleteUser = userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.GONE);
    }

    @PutMapping("/id")
    public ResponseEntity<User> updateUser(@PathVariable Long id){
        User updateUser = userService.updateUser(id);
        return new ResponseEntity<>(updateUser,HttpStatus.OK);
    }

// <<<<<<< tarek_test
// =======


// >>>>>>> develop
}
