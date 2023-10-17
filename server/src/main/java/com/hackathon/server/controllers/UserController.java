package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.models.User;
import com.hackathon.server.models.dtos.UserDTO;
import com.hackathon.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

// <<<<<<< developAI
//     @PostMapping("/addUser")
// =======
//     @PostMapping
// >>>>>>> develop
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
}
