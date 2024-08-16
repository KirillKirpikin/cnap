export function formatDateTime(inputDateTimeString: string, without?: boolean): string {
    const dateObj: Date = new Date(inputDateTimeString);
    const formattedDate: string = `${padZero(dateObj.getDate())}.${padZero(dateObj.getMonth() + 1)}.${dateObj.getFullYear().toString().slice(-2)}`;
    const formattedTime: string = `${padZero(dateObj.getHours())}:${padZero(dateObj.getMinutes())}`;
  
    return `${formattedDate} ${ without ? '' : formattedTime}`;
}
  
function padZero(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
}
  
  