
(function(tag, counts) {
  var i, sum, _i, _len;
  sum = 0;
  for (_i = 0, _len = counts.length; _i < _len; _i++) {
    i = counts[_i];
    sum += i;
  }
  return sum;
});
