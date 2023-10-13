package com.hackathon.server.controllers;

import com.hackathon.server.authentication.LoginForm;
import com.hackathon.server.models.AccessNeed;
import com.hackathon.server.models.MentalHealthCondition;
import com.hackathon.server.models.User;
import com.hackathon.server.models.UserDTO;
import com.hackathon.server.models.dtos.UserAccessNeedDTO;
import com.hackathon.server.models.dtos.UserMentalHealthConditionDTO;
import com.hackathon.server.services.AccessNeedService;
import com.hackathon.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping({"accessNeeds"})
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

         @Autowired
         AccessNeedService accessNeedService;

         @GetMapping
         public ResponseEntity<List<AccessNeed>> getAllAccessNeeds(){
             return new ResponseEntity<>(this.accessNeedService.getAllAccessNeeds(), HttpStatus.FOUND);
         }

         @GetMapping("/{id}")
         public ResponseEntity<AccessNeed> getAccessNeedById(@PathVariable Long id){
             AccessNeed accessNeed = accessNeedService.getAccessNeedById(id);
             return new ResponseEntity<>(accessNeed,HttpStatus.FOUND);
         }

        @GetMapping(value = "/user/{userId}")
        public ResponseEntity<Optional<List<AccessNeed>>> getAccessNeedsByUser(@PathVariable Long userId){
            Optional<List<AccessNeed>> userAccessNeeds= accessNeedService.getAccessNeedsByUser(userId);
            if(userAccessNeeds.isPresent()){
                return new ResponseEntity<>(accessNeedService.getAccessNeedsByUser(userId), HttpStatus.OK);
            }else{
                return new ResponseEntity<>(null,HttpStatus.NO_CONTENT);
            }
        }

        @PostMapping(value = "/{userId}")
        public void createUserAccessNeeds(@RequestBody UserAccessNeedDTO userAccessNeedDTO, @PathVariable Long userId){
            accessNeedService.saveUserAccessNeeds(userAccessNeedDTO, userId);
        }

     }

// >>>>>>> develop
