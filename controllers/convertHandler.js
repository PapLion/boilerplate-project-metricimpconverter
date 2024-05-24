function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const numRegex = /^[\d/.]+/;
    const match = input.match(numRegex);
    
    if (match) {
      const numStr = match[0];
      const fractionCount = (numStr.match(/\//g) || []).length;
      
      if (fractionCount > 1) {
        result = 'invalid number';
      } else if (fractionCount === 1) {
        const [numerator, denominator] = numStr.split('/');
        if (!numerator || !denominator) {
          result = 'invalid number';
        } else {
          result = parseFloat(numerator) / parseFloat(denominator);
        }
      } else {
        result = parseFloat(numStr);
      }
    } else {
      result = 1;
    }
    
    if (isNaN(result)) {
      return 'invalid number';
    }
    
    return result;
  };

  this.getUnit = function(input) {
    const unitRegex = /[a-zA-Z]+$/;
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const match = input.match(unitRegex);
    if (match) {
      const unit = match[0].toLowerCase();
      if (unit === 'l') return 'L';
      if (validUnits.includes(unit)) return unit;
    }
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellMap[unit];
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        result = 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitString = this.spellOutUnit(initUnit);
    const returnUnitString = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
  };

}

module.exports = ConvertHandler;
