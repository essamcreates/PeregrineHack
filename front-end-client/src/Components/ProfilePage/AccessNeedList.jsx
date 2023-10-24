const AccessNeedList = ({ accessNeeds }) => {
    return (
        <>
            <h2 className="text-2xl font-semibold">Access Needs</h2>
            {accessNeeds.length > 0 ? (
                <ul className="mt-4">
                    {accessNeeds.map((accessNeed) => (
                        <li key={accessNeed.id} className="mb-2">
                            {accessNeed.accessNeedENUM}
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
