package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.models.AccessNeed;
import com.hackathon.server.models.User;
import com.hackathon.server.models.UserDTO;
import com.hackathon.server.services.AccessNeedService;
import com.hackathon.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/accessneed"})
public class AccessNeedController {

// <<<<<<< tarek_test
// }
// =======
//     /*
//     * TODO:
//     *   GET getAllAccessNeeds
//         GET getAccessNeedById
//         POST createAccessNeed (maybe)
//         DELETE deleteAccessNeed (maybe)
// */

//         @Autowired
//         AccessNeedService accessNeedService;

//         @GetMapping
//         public ResponseEntity<List<AccessNeed>> getAllAccessNeeds(){
//             return new ResponseEntity<>(this.accessNeedService.getAllAccessNeeds(), HttpStatus.FOUND);
//         }

//         @GetMapping("/id")
//         public ResponseEntity<AccessNeed> getAccessNeedById(@PathVariable Long id){
//             AccessNeed accessNeed = accessNeedService.getAccessNeedById(id);
//             return new ResponseEntity<>(accessNeed,HttpStatus.FOUND);
//         }

//     }

// >>>>>>> develop
