package com.hackathon.server.services;

 import com.hackathon.server.models.User;
 import com.hackathon.server.models.dtos.UserDTO;
 import com.hackathon.server.repositories.UserRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

 import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;


     public List<User> findAllCustomers() {
        return this.userRepository.findAll();
     }

     public User getUserById(Long id) {
         return this.userRepository.findById(id).get();
     }

     public User addUser(UserDTO userDTO) {
         if(userRepository.findByEmail(userDTO.getEmail()) !=null){
             return null;

         }
         User user = new User(userDTO.getName(),userDTO.getDateOfBirth(),userDTO.getPassword(),userDTO.getGender(),userDTO.getEmail());
         return this.userRepository.save(user);
     }

     public User checkCredentials(String email, String password) {
         User user = userRepository.findByEmail(email);
         if(user!= null && user.getPassword().matches(password)){
             return user;
         }
         return null;
     }

     public User deleteUser(Long id) {
         return userRepository.deleteUserById(id);

     }

     public User updateUser(Long id) {
         User user = userRepository.findById(id).get();

         // on the endpoint make the pathvariables optional then do if statements here and finish it off TAREK.
 //
 //        user.setName();
 //        user.setDateOfBirth();
 //        user.setPassword();
 //        user.setGender();
 //        user.setEmail();
         return null;

     }

}
