import {Link} from "react-router-dom";


const Option = () => {

    const [questions, setQuestions] = useState([]);
    const fetchUserScore = async () =>{
        const response = await fetch('http://localhost:8080/personalityQuestionnaire');
        const data = await response.json();
        setQuestions(data);
    }

    useEffect(()=>{
        fetchUserScore();

    },[]);
    
    
    return (
        <div>
            {questions.map((question, index) => (
            <div key={index}>{question}</div>
        ))}
        </div>
    )
}
export default Option;