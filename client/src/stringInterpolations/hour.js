
export default function(strings, ...values) {
    return strings.map(function(curr, idx) {
      if (values[idx - 1])
        if (values[idx - 1] instanceof Date)
          return values[idx - 1].getHours() + ':00' + curr;
         else
          return values[idx - 1] + curr;
      else
      	return curr;
    }).join('');
}