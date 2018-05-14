/**
    @file calc.js
    @description Where the magic happens!
    @author Jared Dantis (@aureljared)
    @license GPLv2
*/

var calc = {
    /**
        Calculates grade average. Get it? calc.ulate? :-(

        @returns {String} The computed average, truncated to 10 decimal places
    */
    ulate: function() {
        var totalUnits = 0, total = 0, isGpa = state.get("isGpa");

        // Get weighted sum
        for (var i = 0; i < subjects.default.length; i++) {
            // Get units
            var units = subjects.default[i].units;
            totalUnits += units;

            // Get grade
            var grade = state.getGrade(i);
            if (isGpa)
                grade = this.convertToGpa(grade);

            // Multiply grade by units and add to sum
            total += grade * units;
        }

        // Convert to string so we can truncate later
        // since we're not supposed to round the value
        return "" + (total / totalUnits).toFixed(10);
    },

    /**
        Converts grade value to GPA equivalent.
        Conversion is based on the following page:

        @param {Float} grade - The grade value
        @returns {Float} The GPA equivalent
    */
    convertToGpa: function(grade) {
        var equiv;

        switch (parseFloat(grade)) {
            case 1:
                equiv = 4.0;
                break;
            case 1.25:
                equiv = 3.7;
                break;
            case 1.5:
                equiv = 3.3;
                break;
            case 1.75:
                equiv = 3.0;
                break;
            case 2:
                equiv = 2.7;
                break;
            case 2.25:
                equiv = 2.3;
                break;
            case 2.5:
                equiv = 2.0;
                break;
            case 2.75:
                equiv = 1.7;
                break;
            case 3:
                equiv = 1.3;
                break;
            case 4:
                equiv = 1.0;
                break;
            default:
                equiv = 0.0;
        }

        return equiv;
    },

    /**
        Checks if an user-entered grade value is a valid grade.

        @param {String} value - The user-entered grade value
        @returns {Object}
            The result of the validation (.result) and the
            reason for invalidation (.reason), if any.
    */
    isValid: function(value) {
        var grade = parseFloat(value), reason = "";

        // Contains characters other than numbers and period
        if (/[^0-9\.]+/.test(value))
            reason = "contains invalid characters";
        // Out of range
        else if (grade < 1 || grade > 5)
            reason = grade + " is out of range";
        // Indivisible by 0.25 for grades greater than 3.00
        else if (grade < 3 && (grade % 0.25 != 0))
            reason = "no such grade";
        // Between 3, 4, and 5
        else if ((grade > 3 && grade < 4) || (grade > 4 && grade < 5))
            reason = "no such grade";

        return {
            result: reason.length > 0,
            reason: reason
        };
    }
};
