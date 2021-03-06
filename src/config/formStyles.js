/*

  a bootstrap like style

*/
'use strict';

import { Platform } from 'react-native';

import { Colors, Fonts } from './styles';

var LABEL_COLOR = Colors.greyDark;
var INPUT_COLOR = Colors.black;
var ERROR_COLOR = Colors.redError;
var HELP_COLOR = '#999999';
var BORDER_COLOR = Colors.greyDark;
var DISABLED_COLOR = Colors.greyDark;
var DISABLED_BACKGROUND_COLOR = '#eeeeee';
var FONT_SIZE = 17;
var FONT_WEIGHT = '400';

var stylesheet = Object.freeze({
    fieldset: {},
    // the style applied to the container of all inputs
    formGroup: {
        normal: {
            marginBottom: 10
        },
        error: {
            marginBottom: 10
        }
    },
    controlLabel: {
        normal: {
            color: LABEL_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        },
        // the style applied when a validation error occours
        error: {
            color: ERROR_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 7,
            fontWeight: FONT_WEIGHT
        }
    },
    helpBlock: {
        normal: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 2
        },
        // the style applied when a validation error occours
        error: {
            color: HELP_COLOR,
            fontSize: FONT_SIZE,
            marginBottom: 2
        }
    },
    errorBlock: {
        fontSize: FONT_SIZE,
        marginBottom: 2,
        color: ERROR_COLOR
    },
    textboxView: {
        normal: {
            borderColor: BORDER_COLOR,
            borderBottomWidth: 1
        },
        error: {
            borderColor: ERROR_COLOR,
            borderBottomWidth: 1
        },
        notEditable: {
            borderColor: BORDER_COLOR,
            borderBottomWidth: 1
        }
    },
    textbox: {
        normal: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            height: 36,
            paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
            paddingRight: 7,
            marginLeft: -4,
            marginBottom: 5
        },
        // the style applied when a validation error occours
        error: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            height: 36,
            paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
            paddingRight: 7,
            marginLeft: -4,
            marginBottom: 5
        },
        // the style applied when the textbox is not editable
        notEditable: {
            fontSize: FONT_SIZE,
            height: 36,
            paddingVertical: (Platform.OS === 'ios') ? 7 : 0,
            paddingRight: 7,
            marginLeft: -4,
            marginBottom: 5,
            color: DISABLED_COLOR,
            // backgroundColor: DISABLED_BACKGROUND_COLOR
        }
    },
    checkbox: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    pickerView: {
        normal: {
            borderColor: BORDER_COLOR,
            borderBottomWidth: 1
        },
        error: {
            borderColor: ERROR_COLOR,
            borderBottomWidth: 1
        },
    },
    pickerContainer: {
        normal: {
            borderRadius: 4,
            borderColor: BORDER_COLOR,
            borderWidth: 1
        },
        error: {
            borderRadius: 4,
            borderColor: ERROR_COLOR,
            borderWidth: 1
        },
        open: {
            // Alter styles when select container is open
        }
    },
    select: {
        normal: Platform.select({
            android: {
                // paddingLeft: 7
                marginLeft: -8,
                color: INPUT_COLOR
            },
            ios: {

            }
        }),
        // the style applied when a validation error occours
        error: Platform.select({
            android: {
              // paddingLeft: 7,
                marginLeft: -8,
                color: ERROR_COLOR
            },
            ios: {

            }
        })
    },
    pickerTouchable: {
        normal: {
            height: 44,
            flexDirection: 'row',
            alignItems: 'center'
        },
        error: {
            height: 44,
            flexDirection: 'row',
            alignItems: 'center'
        },
        active: {
            borderBottomWidth: 1,
            borderColor: BORDER_COLOR
        }
    },
    pickerValue: {
        normal: {
            fontSize: FONT_SIZE,
            paddingLeft: 7
        },
        error: {
            fontSize: FONT_SIZE,
            paddingLeft: 7
        }
    },
    datepicker: {
        normal: {
            marginBottom: 4
        },
        // the style applied when a validation error occours
        error: {
            marginBottom: 4
        }
    },
    dateTouchable: {
        normal: {},
        error: {}
    },
    dateValue: {
        normal: {
            color: INPUT_COLOR,
            fontSize: FONT_SIZE,
            padding: 7,
            marginBottom: 5
        },
        error: {
            color: ERROR_COLOR,
            fontSize: FONT_SIZE,
            padding: 7,
            marginBottom: 5
        }
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

module.exports = stylesheet;
