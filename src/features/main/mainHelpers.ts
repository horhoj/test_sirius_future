const LOCALE = 'ru-ru';

const getTimeIsLeft = (unixTime: number | null) => {
  if (unixTime === null) {
    return null;
  }
  const currentTime = new Date().getTime();
  if (currentTime > unixTime) {
    return null;
  }
  const timeInMilliseconds = unixTime - currentTime;

  interface Step {
    label: string;
    units: number;
    done: boolean;
  }
  const stepList = [
    { label: 'ms', units: 1000, done: false },
    { label: 's', units: 60, done: false },
    { label: 'm', units: 60, done: false },
    { label: 'h', units: 24, done: false },
    { label: 'd', units: 1, done: true },
  ] as const satisfies Step[];

  type Data = (typeof stepList)[number]['label'];

  let currentOct = timeInMilliseconds;
  const data = {} as Record<Data, number>;

  stepList.forEach((step) => {
    const oct = currentOct % step.units;
    currentOct = (currentOct - oct) / step.units;
    if (step.done) {
      data[step.label] = currentOct;
    } else {
      data[step.label] = oct;
    }
  });

  return data;
};

const getDate = (unixTime: number) => new Date(unixTime).getDate();

const getMonthLabel = (unixTime: number) => new Date(unixTime).toLocaleDateString('ru-ru', { month: 'long' });

const getTimeLabel = (selectedDate: number) => {
  return new Date(selectedDate).toLocaleTimeString(LOCALE, { hour: '2-digit', minute: '2-digit' });
};

export const mainHelpers = { getTimeIsLeft, getDate, getMonthLabel, getTimeLabel } as const;
