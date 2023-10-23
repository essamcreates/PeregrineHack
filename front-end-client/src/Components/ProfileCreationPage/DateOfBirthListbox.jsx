import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

const DateOfBirthListbox = ({ dateOfBirth, setDateOfBirth }) => {
  const { day, month, year } = dateOfBirth;

  const loopNumber = (start, end) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      if (i < 10) {
        options.push(
          <Listbox.Option
            key={i + start}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-amber-100 text-amber-900" : "text-gray-900"
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
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                active ? "bg-amber-100 text-amber-900" : "text-gray-900"
              }`
            }
            value={i}
          >
            {i}
          </Listbox.Option>
        );
      }
    }
    return options;
  };

  return (
    <>
      <span>Date Of Birth</span>
      <div className="flex gap-2">
        {/* Day dropdown */}
        <div className="relative w-40">
          <Listbox
            value={day}
            onChange={(selectedDay) => setDateOfBirth({ ...dateOfBirth, day: selectedDay })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
        <div className="relative w-40">
          <Listbox
            value={month}
            onChange={(selectedMonth) => setDateOfBirth({ ...dateOfBirth, month: selectedMonth })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                  {loopNumber(1, 12)}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* Year dropdown */}
        <div className="relative w-40">
          <Listbox
            value={year}
            onChange={(selectedYear) => setDateOfBirth({ ...dateOfBirth, year: selectedYear })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
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
                  {loopNumber(1, 12)}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </>
  );

  /* <label> Date of Birth:</label>
<div className="select-date">
  <select
    id="select-day"
    value={enteredDOBDay}
    onChange={(e) => {
      setEnteredDOBDay(e.target.value);
    }}
  >
    <option value="" disabled selected hidden>
      DD
    </option>
    {loopNumber(1, 31)}
  </select>
  <select
    id="select-month"
    value={enteredDOBMonth}
    onChange={(e) => {
      setEnteredDOBMonth(e.target.value);
    }}
  >
    <option value="" disabled selected hidden>
      MM
    </option>
    <option value="01">January</option>
    <option value="02">February</option>
    <option value="03">March</option>
    <option value="04">April</option>
    <option value="05">May</option>
    <option value="06">June</option>
    <option value="07">July</option>
    <option value="08">August</option>
    <option value="09">September</option>
    <option value="10">October</option>
    <option value="11">November</option>
    <option value="12">December</option>
  </select>
  <select
    id="select-year"
    value={enteredDOBYear}
    onChange={(e) => {
      setEnteredDOBYear(e.target.value);
    }}
    placeholder="YYYY"
  >
    <option value="" disabled selected hidden>
      YYYY
    </option>
    {loopNumber(1935, 2023)}
  </select>
</div> */
};

export default DateOfBirthListbox;
