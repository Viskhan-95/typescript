import makeOrdinal from './makeOrdinal';
import isFinite from './isFinite';
import isSafeNumber from './isSafeNumber';

enum listNum {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1_000_000,
    ONE_BILLION = 1_000_000_000,
    ONE_TRILLION = 1_000_000_000_000,
    ONE_QUADRILLION = 1_000_000_000_000_000,
    MAX = 9_007_199_254_740_992,
}

const LESS_THAN_TWENTY: string[] = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
];

const TENTHS_LESS_THAN_HUNDRED: string[] = [
    'zero', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number | string} num
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */

function toWords(num: number | string, asOrdinal?: boolean): string {
    let words: string;
    let parsNum = parseInt(num as string, 10);

    if (!isFinite(parsNum)) {
        throw new TypeError(
            'Not a finite number: ' + num + ' (' + typeof num + ')'
        );
    }
    if (!isSafeNumber(parsNum)) {
        throw new RangeError(
            'Input is not a safe number, it’s either too large or too small.'
        );
    }
    words = generateWords(parsNum);
    return asOrdinal ? makeOrdinal(words) : words;
}


function generateWords(num: number, words: string[] = []) {
    // инициализировал переменную нулем, чтоб избавиться от ошибки
    let remainder: number = 0;
    //добавил возможный вариант undefined, что позволило убрать ошибку, надеюсь так можно?)
    let word: string | undefined;
    // We’re done
    if (num === 0) {
        return !words ? 'zero' : words.join(' ').replace(/,$/, '');
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (num < 0) {
        words.push('minus');
        num = Math.abs(num);
    }

    if (num < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[num];

    } else if (num < listNum.ONE_HUNDRED) {
        remainder = num % listNum.TEN;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num / listNum.TEN)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += '-' + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }

    } else if (num < listNum.ONE_THOUSAND) {
        remainder = num % listNum.ONE_HUNDRED;
        word = generateWords(Math.floor(num / listNum.ONE_HUNDRED)) + ' hundred';

    } else if (num < listNum.ONE_MILLION) {
        remainder = num % listNum.ONE_THOUSAND;
        word = generateWords(Math.floor(num / listNum.ONE_THOUSAND)) + ' thousand,';

    } else if (num < listNum.ONE_BILLION) {
        remainder = num % listNum.ONE_MILLION;
        word = generateWords(Math.floor(num / listNum.ONE_MILLION)) + ' million,';

    } else if (num < listNum.ONE_TRILLION) {
        remainder = num % listNum.ONE_BILLION;
        word = generateWords(Math.floor(num / listNum.ONE_BILLION)) + ' billion,';

    } else if (num < listNum.ONE_QUADRILLION) {
        remainder = num % listNum.ONE_TRILLION;
        word = generateWords(Math.floor(num / listNum.ONE_TRILLION)) + ' trillion,';

    } else if (num <= listNum.MAX) {
        remainder = num % listNum.ONE_QUADRILLION;
        word = generateWords(Math.floor(num / listNum.ONE_QUADRILLION)) +
        ' quadrillion,';
    }

    if(word) {
        words.push(word);
    }
    return generateWords(remainder, words);
}

export default toWords;