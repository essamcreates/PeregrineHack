const Entry = ({entry}) => {

    const formatDateTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        const meridiem = (hours >= 0 && hours < 12) ? 'AM' : 'PM';

        return `${day}/${month}\n${hours}:${minutes} ${meridiem}`;
      };

    const getMood = () => {
        const unicodeInt = parseInt(entry.emojiUnicode, 16)
        return String.fromCodePoint(unicodeInt)
    }

    return (
        // removes dot from list
        <ul class="list-none">
        <li class="group relative hover:bg-teal-100 hover:text-slate-600 border-2 border-slate-400 m-2 bg-gray-50 rounded-xl">
          <div class="flex items-center p-4 ">
            <div class="w-20 ">
              <p class="text-5xl mr-4 ">{getMood()}</p>
            </div>
            <div class="flex-1">
              <p class="text-sm text-center mr-1 font-mono">{entry.mood}</p>
            </div>
            <div class="text-center w-20 font-mono m-1">
              <p class="text-sm m-1 ml-1">{formatDateTime(entry.dateTime)}</p>
            </div>
          </div>
        </li>
      </ul>
    )
}
export default Entry;