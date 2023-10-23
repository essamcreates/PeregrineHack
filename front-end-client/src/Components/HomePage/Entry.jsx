const Entry = ({entry, moodChoices}) => {

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const options = {
          day: '2-digit',
          month: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
      
        return new Intl.DateTimeFormat('en-US', options).format(date);
      };

    return (
        <>
        <div class="text-center grid grid-cols-5 w-full">
            <div>
                <p>😁</p>
            </div>
            <div class="cols-span-3">
                <p>{entry.mood}</p>
            </div>
            <div class="cols-span-2">
                <p>{formatDateTime(entry.dateTime)}</p>
            </div>
        </div>
        </>
    )
}
export default Entry;