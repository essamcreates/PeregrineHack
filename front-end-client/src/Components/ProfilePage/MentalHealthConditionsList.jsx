const MentalHealthConditionsList = ({ conditions }) => {
  const formatString = (string) => {
    if (!(string === "ADHD" || string === "ASD")) {
      if (string.includes("_")) {
        const formattedString = string
          .split("_")
          .map((word) => word.toUpperCase())
          .join(" ");
        return formattedString;
      } else {
        const formattedString = string.toUpperCase();
        return formattedString;
      }
    }
    return string;
  };

  return (
    <>
      <h2 className="text-2xl font-semibold">Mental Health Conditions</h2>
      {conditions.length > 0 ? (
        <ul className="mt-4">
          {conditions.map((condition) => (
            <li key={condition.id} className="mb-2">
              {formatString(condition.mentalHealthCondition)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No known mental health conditions</p>
      )}
    </>
  );
};

export default MentalHealthConditionsList;
