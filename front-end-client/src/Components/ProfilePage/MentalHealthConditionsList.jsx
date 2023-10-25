const MentalHealthConditionsList = ({ conditions }) => {
  return (
      <>
          <h2 className="text-2xl font-semibold">Mental Health Conditions</h2>
          {conditions.length > 0 ? (
              <ul className="mt-4">
                  {conditions.map((condition) => (
                      <li key={condition.id} className="mb-2">
                          {condition.mentalHealthCondition}
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
