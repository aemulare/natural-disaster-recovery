import React, { Component } from 'react';
import { Grid, Row, Col, Button, ButtonToolbar, Panel } from 'react-bootstrap';
import moment from 'moment';
import axios from 'axios';
import DateOfBirthField from './dob_field';
import FieldGroup from '../shared/field_group';
import SelectField from '../shared/select_field';
import Userpic from '../shared/userpic';
import FilePicker from '../shared/filepicker';
import Auth from '../../modules/auth';
import UserPicture from '../../assets/images/userpics/user_01.jpg';

// const UserPicture = () => `../../assets/images/userpics/user_0${Auth.currentUserId()}.jpg`;

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      selectedCountry: 235,
      usStates: [],
      selectedUsState: null,
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: moment().subtract(18, 'years').calendar(),
      userpic: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      region: '',
      postalCode: '',
      phone: '',
      email: '',
      password: '',
      readOnly: true
    };

    this.updateUserProfile = this.updateUserProfile.bind(this);

    this.handleCountrySelect = this.handleCountrySelect.bind(this);
    this.handleUsStateSelect = this.handleUsStateSelect.bind(this);

    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleMiddleNameChanged = this.handleMiddleNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
    this.handleDateOfBirthChanged = this.handleDateOfBirthChanged.bind(this);
    this.handleUserpicChanged = this.handleUserpicChanged.bind(this);
    this.handleAddressLine1Changed = this.handleAddressLine1Changed.bind(this);
    this.handleAddressLine2Changed = this.handleAddressLine2Changed.bind(this);
    this.handleCityChanged = this.handleCityChanged.bind(this);
    this.handleRegionChanged = this.handleRegionChanged.bind(this);
    this.handlePostalCodeChanged = this.handlePostalCodeChanged.bind(this);
    this.handlePhoneChanged = this.handlePhoneChanged.bind(this);

    this.editUserProfile = this.editUserProfile.bind(this);
    this.cancelEditUserProfile = this.cancelEditUserProfile.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
  }


  componentDidMount() {
    const API_URL = 'http://localhost:8000/api/v1';
    const API_HEADERS = { 'Content-Type': 'application/json', Authorization: Auth.token() };
    const client = axios.create({
      baseURL: API_URL,
      timeout: 1000,
      headers: API_HEADERS
    });

    client.get('countries', { })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ countries: res.data });
          console.log(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    client.get('states', { })
      .then((res) => {
        if (res.status === 200) {
          this.setState({ usStates: res.data });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    client.get(`users/${Auth.currentUserId()}`, {})
      .then((res) => {
        if (res.status === 200) {
          const { email, firstName, middleName, lastName, dob, phone, address } = res.data;
          const { addressLine1, addressLine2, city, postcode, state_id, country_id } = address;
          this.setState({
            email,
            password: 'RESTRICTED',
            firstName,
            middleName,
            lastName,
            dateOfBirth: moment(dob).format('YYYY-MM-DD'),
            phone,
            addressLine1,
            addressLine2,
            city,
            postalCode: postcode,
            selectedUsState: state_id,
            selectedCountry: country_id
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editUserProfile() {
    this.setState({ readOnly: false });
  }


  cancelEditUserProfile() {
    this.setState({ readOnly: true });
  }


  updateUserProfile(event) {
    event.preventDefault();
    const {
      selectedCountry,
      selectedUsState,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      phone
    } = this.state;

    const API_URL = 'http://localhost:8000/api/v1';
    const API_HEADERS = { 'Content-Type': 'application/json', Authorization: Auth.token() };
    const client = axios.create({
      baseURL: API_URL,
      timeout: 1000,
      headers: API_HEADERS
    });

    client.put(`users/${Auth.currentUserId()}`, {
      firstName,
      middleName,
      lastName,
      dob: dateOfBirth,
      address: {
        addressLine1,
        addressLine2,
        city,
        region,
        postcode: postalCode,
        phone,
        country: selectedCountry,
        state: selectedUsState
      }
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('User profile updated');
        }
        this.setState({ readOnly: true });
      })

      .catch(error => console.log(error));
  }

  handleCountrySelect(event) {
    this.setState({ selectedCountry: event.target.value });
  }

  handleUsStateSelect(event) {
    this.setState({ selectedUsState: event.target.value });
  }

  handleFirstNameChanged(event) {
    this.setState({ firstName: event.target.value });
  }

  handleMiddleNameChanged(event) {
    this.setState({ middleName: event.target.value });
  }

  handleLastNameChanged(event) {
    this.setState({ lastName: event.target.value });
  }

  handleDateOfBirthChanged(event) {
    this.setState({ dateOfBirth: event.target.value });
  }

  handleUserpicChanged(event) {
    this.setState({ userpic: event.target.value });
  }

  handleAddressLine1Changed(event) {
    this.setState({ addressLine1: event.target.value });
  }

  handleAddressLine2Changed(event) {
    this.setState({ addressLine2: event.target.value });
  }

  handleCityChanged(event) {
    this.setState({ city: event.target.value });
  }

  handleRegionChanged(event) {
    this.setState({ region: event.target.value });
  }

  handlePostalCodeChanged(event) {
    this.setState({ postalCode: event.target.value });
  }

  handlePhoneChanged(event) {
    this.setState({ phone: event.target.value });
  }

  render() {
    const {
      countries,
      selectedCountry,
      usStates,
      selectedUsState,
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      userpic,
      addressLine1,
      addressLine2,
      city,
      region,
      postalCode,
      phone,
      email,
      password,
      readOnly
    } = this.state;


    return (
      <div>
        <br />
        <Panel width={800}>
          <form onSubmit={this.updateUserProfile}>
            <Grid>
              <Row>
                <Col sm={12} md={3} lg={3}>
                  <FieldGroup type="text" label="First Name" value={firstName} name="firstName" changeCallback={this.handleFirstNameChanged} width={300} important disabled={readOnly} />
                  <FieldGroup type="text" label="Middle Name" value={middleName} name={middleName} changeCallback={this.handleMiddleNameChanged} disabled={readOnly} />
                  <FieldGroup type="text" label="Last Name" value={lastName} name={lastName} changeCallback={this.handleLastNameChanged} disabled={readOnly} />
                  <DateOfBirthField dateOfBirth={dateOfBirth} name={dateOfBirth} changeCallback={this.handleDateOfBirthChanged} disabled={readOnly} />
                  <FieldGroup type="text" label="Phone Number" value={phone} name={phone} changeCallback={this.handlePhoneChanged} disabled={readOnly} />
                  <FieldGroup type="email" label="Email" value={email} disabled />
                  <FieldGroup type="password" label="Password" value={password} disabled />
                </Col>

                <Col sm={12} md={5} lg={5}>
                  <SelectField
                    label="Country"
                    selectedValue={selectedCountry}
                    placeholder="Select your country"
                    options={countries}
                    valueGetter={option => option.id}
                    onSelect={this.handleCountrySelect}
                    disabled={readOnly}
                  />
                  <FieldGroup type="text" label="Address Line 1" value={addressLine1} name={addressLine1} changeCallback={this.handleAddressLine1Changed} disabled={readOnly} />
                  <FieldGroup type="text" label="Address Line 2 (optional)" value={addressLine2} name={addressLine2} changeCallback={this.handleAddressLine2Changed} disabled={readOnly} />
                  <FieldGroup type="text" label="City" value={city} name={city} changeCallback={this.handleCityChanged} disabled={readOnly} />
                  {
                    selectedCountry === 235 ?
                      <SelectField
                        label="State"
                        selectedValue={selectedUsState}
                        placeholder="Select your country"
                        options={usStates}
                        valueGetter={option => option.id}
                        onSelect={this.handleUsStateSelect}
                        disabled={readOnly}
                      />
                   : <FieldGroup type="text" label="Region / Province" value={region} name={region} changeCallback={this.handleRegionChanged} disabled={readOnly} />
                  }
                  <FieldGroup type="text" label="Postal Code" value={postalCode} name={postalCode} changeCallback={this.handlePostalCodeChanged} disabled={readOnly} />
                </Col>

                <Col sm={12} md={2} lg={2}>
                  <Userpic src={UserPicture} width={200} />
                  <FilePicker value={userpic} changeCallback={this.handleUserpicChanged} />
                </Col>

              </Row>
              <Row>
                <Col sm={12}>
                  <ButtonToolbar>
                    <Button className="btn btn-warning" disabled={!readOnly} onClick={this.editUserProfile}>
                      Edit
                    </Button>
                    <Button type="submit" className="btn btn-primary" id="save" disabled={readOnly}>
                      Save
                    </Button>
                    <Button className="btn btn-default" disabled={readOnly} onClick={this.cancelEditUserProfile}>
                      Cancel
                    </Button>
                  </ButtonToolbar>
                </Col>
              </Row>
            </Grid>
          </form>
        </Panel>
      </div>
    );
  }
}

export default UserProfile;
