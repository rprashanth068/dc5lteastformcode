import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { ContactHeader } from './ContactHeader';
import { MyForm } from './MyForm';
import { EntityForm } from'./EntityForm';

const save_ico = require('../../../icons/NRD-00001_02013_ICO_Save cccccc_001.svg');
const delete_icon1 = require('../../../icons/NRD-00001_02013_ICO_Delete cccccc_001.svg');
const save_icon  = require( '../../../icons/NRD-00001_02013_ICO_Save ff6600_001.svg');
const delete_icon  = require( '../../../icons/NRD-00001_02013_ICO_Delete ff6600_001.svg');

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {

  constructor(props) {
    super(props);
  }

  // this method will switch between forms
  formChange = (formType) => {
    this.setState({formType: formType});
    console.log('formType ', formType);
  }

  state = {
    formType: 'individual',
    contactData: {
      'save': save_ico,
      'delete': delete_icon1,
      'save1': save_icon,
      'delete1': delete_icon,
      'formType': 'individual',
      formChange: (formType => {
        this.formChange(formType);
      })
    }
  }

  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={styles.helloWorld}  >
        <div className="container main-container ">
          <ContactHeader contactData={this.state.contactData}></ContactHeader>
          {this.state.formType === 'individual' ? <MyForm></MyForm> : <EntityForm></EntityForm>}
        </div>
      </div>
    );
  }
}
