const CareerGoalsList = ({ currentUserGoals }) => {
  return (
      <>
          <h2 className="text-2xl font-semibold">Career Goals</h2>
          {currentUserGoals.length > 0 ? (
              <ul className="mt-4">
                  {currentUserGoals.map((careerGoal) => (
                      <li key={careerGoal.id} className="mb-2 font-bold">
                          {careerGoal.goal}
                      </li>
                  ))}
              </ul>
          ) : (
              <p>No career goals added</p>
          )}
      </>
  );
};

export default CareerGoalsList;
