import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const DateOfBirthListbox = ({ dateOfBirth, setDateOfBirth }) => {
  const { day, month, year } = dateOfBirth;

  const getMonth = (month) => {
    const date = new Date();
    date.setMonth(month - 1);
    return date.toLocaleString("en-US", {
      month: "long"
    });
  };

  const loopNumber = (start, end, isMonth) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      if (isMonth) {
        options.push(
          <Listbox.Option
            key={i + start}
            className={({ active }) =>
              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                active ? "bg-teal-100 text-teal-900" : "text-gray-900"
              }`
            }
            value={getMonth(i)}
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                  {getMonth(i)}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        );
      } else {
        if (i < 10) {
          options.push(
            <Listbox.Option
              key={i + start}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? "bg-teal-100 text-teal-900" : "text-gray-900"
                }`
              }
              value={"0" + i}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                    {"0" + i}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          );
        } else {
          options.push(
            <Listbox.Option
              key={i + start}
              className={({ active }) =>
                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                  active ? "bg-teal-100 text-teal-900" : "text-gray-900"
                }`
              }
              value={i}
            >
              {({ selected }) => (
                <>
                  <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                    {i}
                  </span>
                  {selected ? (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  ) : null}
                </>
              )}
            </Listbox.Option>
          );
        }
      }
    }
    return options;
  };

  return (
    <>
      <div className="grid grid-flow-col grid-rows-2 gap-x-4 justify-center my-1">
        {/* Day dropdown */}
        <div className="text-center flex justify-center items-center h-full">
          <span>Day</span>
        </div>
        <div className="relative w-40 col-span-1">
          <Listbox
            value={day}
            onChange={(selectedDay) => setDateOfBirth({ ...dateOfBirth, day: selectedDay })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <span className="block truncate">{day}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {loopNumber(1, 31)}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Month dropdown */}
        <div className="text-center flex justify-center items-center h-full">
          <span>Month</span>
        </div>
        <div className="relative w-40">
          <Listbox
            value={month}
            onChange={(selectedMonth) => setDateOfBirth({ ...dateOfBirth, month: selectedMonth })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <span className="block truncate">{month}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {loopNumber(1, 12, true)}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Year dropdown */}
        <div className="text-center flex justify-center items-center h-full">
          <span>Year</span>
        </div>
        <div className="relative w-40">
          <Listbox
            value={year}
            onChange={(selectedYear) => setDateOfBirth({ ...dateOfBirth, year: selectedYear })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <span className="block truncate">{year}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {loopNumber(1935, 2023)}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </>
  );
};

export default DateOfBirthListbox;
