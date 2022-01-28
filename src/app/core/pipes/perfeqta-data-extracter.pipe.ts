import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'perfeqtaDataExtracter'
})
export class PerfeqtaDataExtracterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {

    let returnValue = '';

    let methodname = args[0];
    let elementId = args[1];
    let parentId = args[2];
    let fieldType = args[3];

    if( value ) {
      if( methodname === 'attribute' ) {
        returnValue = value['entries'][elementId] ? value['entries'][elementId][parentId] : 'n/a';
      }
      else if( methodname === 'procedureQuestion' ) {
        let condition = elementId + "-" + parentId;
        if( fieldType === 'date' ) {
          returnValue = value['entries'][condition][parentId]? moment( value['entries'][condition][parentId] ).utc().format('MM/DD/YYYY') : 'n/a';
        }
        else {
          returnValue = value['entries'][condition][parentId]? value['entries'][condition][parentId] : 'n/a';
        }
      }
      else if( methodname === 'siteQuestion' ) {
        let obj: any = Object.values( value['level'] ).filter( (el: any) => el.levelId == elementId.split(".")[1] )[0];
        returnValue = obj['title']
      }
      else if( methodname === 'recordStatus' || methodname === 'modifiedByName' || methodname === 'createdDate' || methodname === 'modifiedDate' ) {
        returnValue = value[methodname];
      }
      else if( methodname === 'assignment' ) {} //special
      else if( methodname === 'child' ) {} //special
      else if( methodname === 'parent' ) {} //special
      else if( methodname === 'appVersion' ) {
        returnValue = value['versions'][ value['versions'].length - 1 ]['version'];
      }
      else if( methodname === 'workFlowReview' ) {} //special
      else if( methodname === 'masterSequance' ) {} //special
      else if( methodname === 'address' ) {
        let addressArr = Object.values( value['levels'] );
        returnValue = addressArr.map( (el: any) => el.title).reverse().join(", ");
      }
    }
    
    return returnValue;

  }

}
