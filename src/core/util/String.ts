interface StringConstructor {
  format(str, ...args): string;
}

String.format = function (str, ...args) {
  if (typeof arguments === 'undefined') {
    return null;
  }
  if (arguments.length < 1) {
    return null;
  }
  if (typeof str !== 'string') {
    return null;
  }
  if (typeof RegExp === 'undefined') {
    return null;
  }

  const string = str;
  const exp = new RegExp(/(%([%]|(\-)?(\+|\x20|\,)?(0)?(\d+)?(\.(\d)?)?([bcdfosxX]|t[cFDrTR])))/g);
  const matchs = new Array();
  const strings = new Array();
  let convCount = 0;
  let stringPosStart = 0;
  let stringPosEnd = 0;
  let matchPosEnd = 0;
  let newString = '';
  let match = null;

  while (match = exp.exec(string)) {
    if (match[9]) { convCount += 1; }

    stringPosStart = matchPosEnd;
    stringPosEnd = exp.lastIndex - match[0].length;
    strings[strings.length] = string.substring(stringPosStart, stringPosEnd);

    matchPosEnd = exp.lastIndex;
    matchs[matchs.length] = {
      match: match[0],
      left: match[3] ? true : false,
      sign: match[4] || '',
      pad: match[5] || ' ',
      min: match[6] || 0,
      precision: match[8],
      code: match[9] || '%',
      negative: (parseInt)(arguments[convCount]) < 0 ? true : false,
      argument: String(arguments[convCount])
    };
  }

  strings[strings.length] = string.substring(matchPosEnd);

  if (matchs.length === 0) { return string; }
  if ((arguments.length - 1) < convCount) { return null; }

  const code = null;
  let i = null;

  for (i = 0; i < matchs.length; i++) {
    let substitution;
    if (matchs[i].code === '%') {
      substitution = '%';
    } else if (matchs[i].code === 'b') {
      if (matchs[i].argument === 'true' || matchs[i].argument === 'false') {
        substitution = convert(matchs[i]);
      }
    } else if (matchs[i].code === 'c') {
      if (matchs[i].argument.length === 1) {
        substitution = convert(matchs[i]);
      }
    } else if (matchs[i].code === 'd') {
      matchs[i].argument = String(Math.abs((parseInt)(matchs[i].argument)));
      substitution = convert(matchs[i]);
    } else if (matchs[i].code === 'f') {
      matchs[i].argument = String(Math.abs((parseFloat)(matchs[i].argument)).toFixed(matchs[i].precision ? matchs[i].precision : 6));
      substitution = convert(matchs[i]);
    } else if (matchs[i].code === 'o') {
      matchs[i].argument = String(Math.abs((parseInt)(matchs[i].argument)).toString(8));
      substitution = convert(matchs[i]);
    } else if (matchs[i].code === 's') {
      matchs[i].argument = matchs[i].argument.substring(0, matchs[i].precision ? matchs[i].precision : matchs[i].argument.length);
      substitution = convert(matchs[i], true);
    } else if (matchs[i].code === 'x') {
      matchs[i].argument = String(Math.abs((parseInt)(matchs[i].argument)).toString(16));
      substitution = convert(matchs[i]);
    } else if (matchs[i].code === 'X') {
      matchs[i].argument = String(Math.abs((parseInt)(matchs[i].argument)).toString(16));
      substitution = convert(matchs[i]).toUpperCase();
    } else if (matchs[i].code === 'tc') {
      substitution = matchs[i].argument;
    } else if (matchs[i].code === 'tF' || matchs[i].code === 'tD' || matchs[i].code === 'tr' ||
      matchs[i].code === 'tT' || matchs[i].code === 'tR') {
      substitution = setdateFormat(matchs[i]);
    } else {
      substitution = matchs[i].match;
    }
    newString += strings[i];
    newString += substitution;
  }
  newString += strings[i];
  return newString;
};

function convert(match, nosign?) {
  if (nosign) {
    match.sign = '';
  } else {
    match.sign = match.negative ? '-' : match.sign;
    if (match.sign === ',' && match.code === 'd') {
      let count = 0;
      let strArg = '';
      for (let i = match.argument.length - 1 ; i > -1 ; i--) {
        count++;
        strArg += match.argument[i];
        if (count % 3 === 0) { strArg += ','; }
      }
      match.argument = strArg.split('').reverse().join('');
      match.sign = '';
    }
  }
  const l = match.min - match.argument.length + 1 - match.sign.length;
  const pad = new Array(l < 0 ? 0 : l).join(match.pad);
  if (!match.left) {
    if (match.pad === '0' || nosign) {
      return match.sign + pad + match.argument;
    } else {
      return pad + match.sign + match.argument;
    }
  } else {
    if (match.pad === '0' || nosign) {
      return match.sign + match.argument + pad.replace(/0/g, ' ');
    } else {
      return match.sign + match.argument + pad;
    }
  }
}

function setdateFormat(match): string {
  let year = match.argument.substring(11, 15);
  let month = match.argument.substring(4, 7);
  const day = match.argument.substring(8, 10);
  let hour = match.argument.substring(16, 18);
  const minute = match.argument.substring(19, 21);
  const second = match.argument.substring(22, 24);
  let amOrPm: string;

  switch (month) {
    case 'Jan': month = '01'; break;
    case 'Feb': month = '02'; break;
    case 'Mar': month = '03'; break;
    case 'Apr': month = '04'; break;
    case 'May': month = '05'; break;
    case 'Jun': month = '06'; break;
    case 'Jul': month = '07'; break;
    case 'Aug': month = '08'; break;
    case 'Sep': month = '09'; break;
    case 'Oct': month = '10'; break;
    case 'Nov': month = '11'; break;
    case 'Dec': month = '12'; break;
  }

  if (match.code === 'tr') {
    let h = <number>hour;
    amOrPm = h > 12 ? '下午' : '上午';
    h = h % 12;
    if (h < 10) { hour = '0' + h.toString(); }
  }

  if (match.code === 'tD') { year = match.argument.substring(13, 15); }

  switch (match.code) {
    case 'tF': return year + '-' + month + '-' + day;
    case 'tD': return month + '/' + day + '/' + year;
    case 'tr': return hour + ':' + minute + ':' + second + ' ' + amOrPm;
    case 'tT': return hour + ':' + minute + ':' + second;
    case 'tR': return hour + ':' + minute;
  }
}


