import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dataExtractor'
})
export class DataExtracterPipe implements PipeTransform {

  transform(value: Object, dataType: string, propertyTrail: string): any {

    let returnValue: any = {};


    if( value ) {

        returnValue = value;

        let properties = propertyTrail.split( '.' );
        let propertyIndentLevel = properties.length;

        for ( let i = 0; i< propertyIndentLevel; i++ ) {
            returnValue = returnValue[ properties[ i ] ];
        }

        switch( dataType ) {
            case "date":
                returnValue = moment( returnValue ).utc().format('MM/DD/YYYY');
                break;
            case "string":
                break;
            default:
                returnValue = "N/A";
                break;
        };
        
    }
    
    return returnValue;

  }

}
