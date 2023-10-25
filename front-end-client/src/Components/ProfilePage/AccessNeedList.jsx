const AccessNeedList = ({ accessNeeds }) => {
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
      <h2 className="text-2xl font-semibold">Access Needs</h2>
      {accessNeeds.length > 0 ? (
        <ul className="mt-4">
          {accessNeeds.map((accessNeed) => (
            <li key={accessNeed.id} className="mb-2">
              {formatString(accessNeed.accessNeedENUM)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No known access needs</p>
      )}
    </>
  );
};

export default AccessNeedList;
