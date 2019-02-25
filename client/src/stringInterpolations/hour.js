
export default function(strings, ...values) {
    var str = "";
    for(let i = 0; i < strings.length; i++) {
        if (i > 0) {
            if (values[i - 1] instanceof Date)
                str += values[i - 1].getHours() + ':00';
            else
                str += values[i - 1];
        }
        str += strings[i];
    }
    return str;
}