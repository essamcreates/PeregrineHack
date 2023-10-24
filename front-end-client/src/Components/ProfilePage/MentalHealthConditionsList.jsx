const MentalHealthConditionsList = ({ conditions }) => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Mental Health Conditions</h2>
      <ul className="mt-4">
        {conditions.map((condition) => (
          <li key={condition.id} className="mb-2">
            {condition.mentalHealthCondition}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MentalHealthConditionsList;
