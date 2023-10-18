package com.hackathon.server.services;

 import com.hackathon.server.models.User;
 import com.hackathon.server.models.dtos.UserDTO;
 import com.hackathon.server.repositories.UserRepository;
 import org.springframework.beans.factory.annotation.Autowired;
 import org.springframework.stereotype.Service;

 import java.time.LocalDate;
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
         if(userRepository.findByEmail(userDTO.getEmail()) == null){
             User user = new User(userDTO.getName(),userDTO.getDateOfBirth(),userDTO.getPassword(),userDTO.getGender(),userDTO.getEmail());
             return this.userRepository.save(user);
         }
         return null;
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

     public User updateUser(Long id, String name, LocalDate dob,String password, String gender, String email) {

         User user = userRepository.findById(id).get();

         if(name != null){
             user.setName(name);
         }else if (dob != null) {
             user.setDateOfBirth(dob);
         }else if(password != null){
             user.setPassword(password);
         }else if (gender != null){
             user.setGender(gender);
         } else if (email != null) {
             user.setEmail(email);
         }

         return userRepository.save(user);
     }

}
