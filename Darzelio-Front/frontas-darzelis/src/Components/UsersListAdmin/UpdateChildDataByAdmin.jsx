import React, { Component, lazy } from 'react';
import { API } from '../../Configuration/AppConfig';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../Style/style.css';

const ModalComponentChildren = lazy(() =>
  import('../Modal/ModalComponentChildren')
);

export default class UpdateChildDataByAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //child id
      id: '',
      //(userID)
      parentId: '',

      birthdate: '',
      firstname: '',
      lastname: '',
      personalCode: 0,

      city: '',
      street: '',
      houseNumber: '',
      flatNumber: 0,

      //second parent id
      secondParentId: '',
      secondParent: '',
      secondParentFirstname: '',
      secondParentLastname: '',
      secondParentEmail: '',
      secondParentPhone: '',
      secondParentPersonalCode: 0,
      secondParentCity: '',
      secondParentStreet: '',

      secondParentHouseNumber: '',
      secondParentFlatNumber: 0,
      secondParentNumberOfKids: 0,
      secondParentStudying: '',
      secondParentStudyingInstitution: '',
      secondParentHasDisability: '',

      secondParentDeclaredResidenceSameAsLiving: '',
      secondParentDeclaredCity: '',
      secondParentDeclaredStreet: '',
      secondParentDeclaredHouseNumber: '',
      secondParentDeclaredFlatNumber: 0,
      adopted: false,

      errors: {
        firstname: '',
        lastname: '',
        personalCode: '',
        birthdate: '',
        city: '',
        street: '',
        houseNumber: '',
        flatNumber: '',

        secondParentFirstname: '',
        secondParentLastname: '',
        secondParentPersonalCode: '',
        secondParentEmail: '',
        secondParentPhone: '',
        secondParentCity: '',
        secondParentStreet: '',
        secondParentHouseNumber: '',
        secondParentFlatNumber: '',
        secondParentNumberOfKids: '',
        secondParentStudyingInstitution: '',
        secondParentDeclaredCity: '',
        secondParentDeclaredStreet: '',
        secondParentDeclaredHouseNumber: '',
        secondParentDeclaredFlatNumber: '',
      },
    };
  }

  componentDidMount() {
    axios
      .get(
        `${API}/api/users/${this.props.match.params.id}/parentdetails/children/${this.props.match.params.type}`
      )

      .then((res) => {
        this.setState({
          parentId: this.props.match.params.id,
          id: res.data.id,
          birthdate: res.data.birthdate,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          personalCode: res.data.personalCode,
          city: res.data.city,
          street: res.data.street,
          houseNumber: res.data.houseNumber,
          flatNumber: res.data.flatNumber,
          secondParent: res.data.secondParent,
          secondParentId: res.data.secondParentId,
          secondParentFirstname: res.data.secondParentFirstname,
          secondParentLastname: res.data.secondParentLastname,
          secondParentEmail: res.data.secondParentEmail,
          secondParentPhone: res.data.secondParentPhone,
          secondParentPersonalCode: res.data.secondParentPersonalCode,
          secondParentCity: res.data.secondParentCity,
          secondParentStreet: res.data.secondParentStreet,
          secondParentHouseNumber: res.data.secondParentHouseNumber,
          secondParentFlatNumber: res.data.secondParentFlatNumber,
          secondParentNumberOfKids: res.data.secondParentNumberOfKids,
          secondParentStudying: res.data.secondParentStudying,
          secondParentStudyingInstitution:
            res.data.secondParentStudyingInstitution,
          secondParentHasDisability: res.data.secondParentHasDisability,
          secondParentDeclaredResidenceSameAsLiving:
            res.data.secondParentDeclaredResidenceSameAsLiving,
          secondParentDeclaredCity: res.data.secondParentDeclaredCity,
          secondParentDeclaredStreet: res.data.secondParentDeclaredStreet,
          secondParentDeclaredHouseNumber:
            res.data.secondParentDeclaredHouseNumber,
          secondParentDeclaredFlatNumber:
            res.data.secondParentDeclaredFlatNumber,
          adopted: res.data.adopted,
        });
      })
      // .catch((err) => console.log(err));
      .catch((err) => {});
  }
  deleteChild = (event) => {
    axios
      .delete(
        `${API}/api/users/${this.state.parentId}/parentdetails/children/${this.state.id}`
      )
      .then(() => {
        alert('Vaikas buvo i??trintas');
        this.props.history.push(
          `/admin/duomenys/vaikai/${this.state.parentId}`
        );
      })
      // .catch((err) => console.log(err));
      .catch((err) => {});
    //console.log('deleteChildren');
  };

  handleChangeDate = (date) => {
    this.setState({
      birthdate: date,
    });
  };
  handleChange = (event) => {
    const validEmailRegex = RegExp(
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    );
    const { name, value } = event.target;
    let errors = this.state.errors;
    let letters = /^[A-Za-z???????????????????????????????????? ]+$/;
    let houseNumberValidation = /^[1-9][a-zA-Z 0-9 ]*$/;
    let streetValidation = /^[a-zA-Z????????????????????????????????????][ a-zA-Z????????????????????????????????????0-9 ,.\- ]*$/;
    let date = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

    let validPersonalCode = /^[5|6]+[0-9]+$/;
    let validParentPersonalCode = /^[3|4|5|6]+[0-9]+$/;
    let validPhone = /^[+][3][7][0][6|5]+[0-9]+$/;
    let numbers = /^[0-9]+$/;
    switch (name) {
      case 'firstname':
        errors.firstname =
          !value.match(letters) || value.length < 2 || value.length === 0
            ? 'Vardas turi b??ti i?? raid??i?? ir ilgesnis nei 1 raid??! '
            : '';
        break;

      case 'lastname':
        errors.lastname =
          !value.match(letters) || value.length < 2 || value.length === 0
            ? 'Pavard?? turi b??ti i?? raid??i?? ir ilgesn?? nei 1 raid??! '
            : '';
        break;

      case 'personalCode':
        errors.personalCode =
          !value.match(validPersonalCode) ||
          value.length < 11 ||
          value.length > 11 ||
          value.length === 0
            ? 'Vaiko asmens kodo formatas: 59001011111 arba 69001011111 '
            : '';
        break;
      case 'birthdate':
        errors.birthdate =
          !value.match(date) || value.length === 0
            ? 'Gimimo datos formatas: 2020-01-01 '
            : '';
        break;
      case 'street':
        errors.street =
          !value || !value.match(streetValidation) || value.length === 0
            ? '??ra??ykite gatv??!'
            : '';
        break;
      case 'city':
        errors.city =
          !value || !value.match(letters) || value.length === 0
            ? '??ra??ykite miest??'
            : '';
        break;
      case 'houseNumber':
        errors.houseNumber =
          !value || !value.match(houseNumberValidation) || value.length === 0
            ? '??ra??ykite namo numer??, pvz.: 1A'
            : '';
        break;

      case 'secondParentFirstname':
        errors.secondParentFirstname =
          !value.match(letters) || value.length < 2 || value.length === 0
            ? 'Vardas turi b??ti i?? raid??i?? ir ilgesnis nei 1 raid??! '
            : '';
        break;

      case 'secondParentLastname':
        errors.secondParentLastname =
          !value.match(letters) || value.length < 2 || value.length === 0
            ? 'Pavard?? turi b??ti i?? raid??i?? ir ilgesn?? nei 1 raid??! '
            : '';
        break;

      case 'secondParentPersonalCode':
        errors.secondParentPersonalCode =
          !value.match(validParentPersonalCode) ||
          value.length < 11 ||
          value.length > 11 ||
          value.length === 0
            ? 'Asmens kodo formatas: 39001011111, 49001011111, 59001011111 arba 69001011111  '
            : '';
        break;

      case 'secondParentStreet':
        errors.secondParentStreet =
          !value || !value.match(streetValidation) || value.length === 0
            ? '??ra??ykite gatv??!'
            : '';
        break;
      case 'secondParentCity':
        errors.secondParentCity =
          !value || !value.match(letters) || value.length === 0
            ? '??ra??ykite miest??'
            : '';
        break;
      case 'secondParentHouseNumber':
        errors.secondParentHouseNumber =
          !value || !value.match(houseNumberValidation) || value.length === 0
            ? '??ra??ykite namo numer??, pvz.: 1A'
            : '';
        break;

      case 'secondParentEmail':
        errors.secondParentEmail =
          validEmailRegex.test(value) || value.length === 0
            ? ''
            : 'El.pa??tas netinkamas! Formato pvz.: vardas@mail.com';
        break;
      case 'secondParentPhone':
        errors.secondParentPhone =
          !value.match(validPhone) ||
          value.length < 12 ||
          value.length > 12 ||
          value.length === 0
            ? 'Telefono numerio formatas +37061234567  arba +37051234567'
            : '';
        break;
      case 'secondParentNumberOfKids':
        errors.secondParentNumberOfKids =
          !value.match(numbers) || value.length < 0
            ? '??ra??ykite vaik?? skai??i??'
            : '';
        break;
      default:
        break;
    }
    if (event.target.type === 'checkbox') {
      this.setState({ [event.target.name]: event.target.checked });
    } else
      this.setState({ errors, [event.target.name]: event.target.value }, () => {
        // console.log(errors);
      });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    const validateForm = (errors) => {
      let valid = true;
      Object.values(errors).forEach(
        // if we have an error string set valid to false
        (val) => val.length > 0 && (valid = false)
      );
      return valid;
    };

    if (validateForm(this.state.errors)) {
      axios
        .put(
          `${API}/api/users/${this.state.parentId}/parentdetails/children/${this.state.id}`,
          {
            birthdate: this.state.birthdate,
            id: this.state.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            personalCode: this.state.personalCode,
            city: this.state.city,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            flatNumber: this.state.flatNumber,
            secondParent: this.state.secondParent,
            secondParentId: this.state.secondParentId,
            secondParentFirstname: this.state.secondParentFirstname,
            secondParentLastname: this.state.secondParentLastname,
            secondParentEmail: this.state.secondParentEmail,
            secondParentPhone: this.state.secondParentPhone,
            secondParentPersonalCode: this.state.secondParentPersonalCode,
            secondParentCity: this.state.secondParentCity,
            secondParentStreet: this.state.secondParentStreet,
            secondParentHouseNumber: this.state.secondParentHouseNumber,
            secondParentFlatNumber: this.state.secondParentFlatNumber,
            secondParentNumberOfKids: this.state.secondParentNumberOfKids,
            secondParentStudying: this.state.secondParentStudying,
            secondParentStudyingInstitution: this.state
              .secondParentStudyingInstitution,
            secondParentHasDisability: this.state.secondParentHasDisability,
            secondParentDeclaredResidenceSameAsLiving: this.state
              .secondParentDeclaredResidenceSameAsLiving,
            secondParentDeclaredCity: this.state.secondParentDeclaredCity,
            secondParentDeclaredStreet: this.state.secondParentDeclaredStreet,
            secondParentDeclaredHouseNumber: this.state
              .secondParentDeclaredHouseNumber,
            secondParentDeclaredFlatNumber: this.state
              .secondParentDeclaredFlatNumber,
            adopted: this.state.adopted,
          }
        )
        .then((response) => {
          alert('Vaiko duomenys atnaujinti s??kmingai');
          this.props.history.push(
            `/admin/duomenys/vaikai/${this.state.parentId}`
          );
        })

        .catch((error) => {
          if (error.response.data === 'This personal code already exists') {
            alert(
              'Pasitikrinkite ar suved??te teisingus asmens kodus. Toks vaiko asmens kodas jau egzstuoja! '
            );
          } else if (error.response.data.message === 'Item already exists') {
            alert(
              'Pasitikrinkite ar suved??te teisingus asmens kodus. Toks asmens kodas jau egzistuoja'
            );
          } else if (error.response.data === 'Toks asmens kodas jau u??imtas') {
            alert('Pasitikrinkite asmens kodus. ' + error.response.data);
          } else if (
            error.response.data === 'Vaiko ir t??vo asmens kodai negali sutapti'
          ) {
            alert('Pasitikrinkite asmens kodus. ' + error.response.data + '!');
          } else if (
            error.response.data === '??is asmens kodas jau egzistuoja sistemoje!'
          ) {
            alert(
              'Pasitikrinkite ar suved??te teisingus asmens kodus. ' +
                error.response.data
            );
          } else if (
            error.response.data === `Gimimo data negali b??ti i?? ateities!`
          ) {
            alert(error.response.data);
          } else if (error.response.data.message === 'Invalid field entry') {
            alert('U??pildykite visus privalomus laukus!');
          } else if (
            error.response.data === `The birthdate can't be from the future`
          ) {
            alert('Gimimo data negali b??ti i?? ateities!');
          } else if (error.response.data.message === `Bad birthdate format`) {
            alert('Netinkamas datos formatas!');
          } else if (
            error.response.data === 't??vas/glob??jas neregistruotas sistemoje'
          ) {
            alert(
              'Registracija nes??kminga. Pirmin?? t??vo registracijos forma turi b??ti u??pildyta pirma'
            );
          } else if (
            error.response.data.message ===
            't??vas/glob??jas neregistruotas sistemoje!'
          ) {
            alert(
              'Registracija nes??kminga. Pirmin?? t??vo/glob??jo registracijos forma neu??pildyta'
            );
          } else if (error.response.status === 400) {
            alert(
              'Registracija nes??kminga! Pasitikrinkite ar pa??ym??jote bei u??pild??te laukus teisingai!'
            );
          }
          //console.log(error.response);
        });
    } else {
      alert(
        'Registracija nes??kminga! Pasitikrinkite ar pa??ym??jote bei u??pild??te laukus teisingai. '
      );
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className=" container m-auto shadow p-3 mb-5 bg-white rounded">
          <div className="mb-4">
            <h3>Atnaujinti vaiko duomenis</h3>
          </div>

          <form onSubmit={this.handleSubmit} className="form-row ">
            <div className="form-group mb-3 col-6">
              <label htmlFor="firstname" className="control-label">
                Vaiko vardas*:
              </label>
              <input
                type="text"
                placeholder="Vaiko vardas"
                className="form-control"
                name="firstname"
                onChange={this.handleChange}
                noValidate
                value={this.state.firstname}
              />
              {errors.firstname.length > 0 && (
                <span className="error">{errors.firstname}</span>
              )}
            </div>
            <div className="form-group mb-3 col-6">
              <label htmlFor="lastname" className="control-label">
                Vaiko pavard??*:
              </label>
              <input
                type="text"
                placeholder="Vaiko pavard??"
                className="form-control"
                name="lastname"
                onChange={this.handleChange}
                noValidate
                value={this.state.lastname}
              />
              {errors.lastname.length > 0 && (
                <span className="error">{errors.lastname}</span>
              )}
            </div>
            <div className="form-group mb-3 col-6  ">
              <label htmlFor="birthdate" className="control-label">
                Vaiko gimimo data*:
              </label>
              <div>
                <input
                  type="text"
                  className="form-control"
                  name="birthdate"
                  value={this.state.birthdate}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group mb-3 col-6">
              <label htmlFor="personalCode" className="control-label">
                Vaiko asmens kodas*:
              </label>
              <input
                type="text"
                placeholder="Asmens kodas"
                className="form-control"
                name="personalCode"
                onChange={this.handleChange}
                noValidate
                value={this.state.personalCode}
              />
              {errors.personalCode.length > 0 && (
                <span className="error">{errors.personalCode}</span>
              )}
            </div>

            <div className="form-group mb-3 col-6">
              <label htmlFor="city" className="control-label">
                Miestas*:
              </label>
              <input
                type="text"
                placeholder="Miestas"
                className="form-control"
                name="city"
                onChange={this.handleChange}
                noValidate
                value={this.state.city}
              />
              {errors.city.length > 0 && (
                <span className="error">{errors.city}</span>
              )}
            </div>
            <div className="form-group mb-3 col-6">
              <label htmlFor="street" className="control-label">
                Gatv??*:
              </label>
              <input
                type="text"
                placeholder="Gatv??"
                className="form-control"
                name="street"
                onChange={this.handleChange}
                noValidate
                value={this.state.street}
              />
              {errors.street.length > 0 && (
                <span className="error">{errors.street}</span>
              )}
            </div>

            <div className="form-group mb-3 col-6">
              <label htmlFor="houseNumber" className="control-label">
                Namo numeris*:
              </label>
              <input
                type="text"
                placeholder="Namo numeris"
                className="form-control"
                name="houseNumber"
                onChange={this.handleChange}
                noValidate
                value={this.state.houseNumber}
              />
              {errors.houseNumber.length > 0 && (
                <span className="error">{errors.houseNumber}</span>
              )}
            </div>
            <div className="form-group mb-3 col-6">
              <label htmlFor="flatNumber" className="control-label">
                Butas:
              </label>
              <input
                type="number"
                min="1"
                placeholder="Butas"
                className="form-control"
                name="flatNumber"
                onChange={this.handleChange}
                noValidate
                value={this.state.flatNumber}
              />
            </div>
            <div className="ml-4 form-check mb-3 col-12">
              <input
                className="form-check-input"
                type="checkbox"
                name="adopted"
                checked={this.state.adopted}
                onChange={this.handleChange}
                value={this.state.adopted}
              />
              <label htmlFor="adopted" className="form-check-label">
                Esu ??io vaiko Glob??jas
              </label>
            </div>
            <h5 className="mt-4 form-group mb-3 col-12">
              {' '}
              Antrojo t??vo/glob??jo duomenys
            </h5>
            <div className="ml-4 form-check mb-3 col-12">
              <input
                className="form-check-input"
                type="checkbox"
                name="secondParent"
                onChange={this.handleChange}
                value={this.state.secondParent}
                checked={this.state.secondParent}
              />
              <label htmlFor="secondParent" className="form-check-label">
                Prid??ti antr??j?? ??io vaiko t??v??/glob??j??
              </label>
              <div className="mt-3 ml-0">
                <b>
                  Prid??j?? antr??j?? t??v??/glob??j??, v??liau jo duomenis gal??site
                  redaguoti, bet pa??alinti galima nebus.
                </b>
              </div>
            </div>
            {this.state.secondParent === true ? (
              <div className="form-row">
                <div className="form-group mb-3 col-6 mt-3">
                  <label
                    htmlFor="secondParentFirstname"
                    className="control-label"
                  >
                    Antrojo t??vo/glob??jo vardas*:
                  </label>
                  <input
                    type="text"
                    placeholder="Vardas"
                    className="form-control"
                    name="secondParentFirstname"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentFirstname}
                  />
                  {errors.secondParentFirstname.length > 0 && (
                    <span className="error">
                      {errors.secondParentFirstname}
                    </span>
                  )}
                </div>
                <div className="form-group mb-3 col-6 mt-3">
                  <label
                    htmlFor="secondParentLastname"
                    className="control-label"
                  >
                    Antrojo t??vo/glob??jo pavard??*:
                  </label>
                  <input
                    type="text"
                    placeholder="Pavard??"
                    className="form-control"
                    name="secondParentLastname"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentLastname}
                  />
                  {errors.secondParentLastname.length > 0 && (
                    <span className="error">{errors.secondParentLastname}</span>
                  )}
                </div>
                <div className="form-group mb-3 col-6">
                  <label htmlFor="secondParentEmail" className="control-label">
                    El.pa??tas*:
                  </label>
                  <input
                    type="email"
                    placeholder="El.pa??tas"
                    className="form-control"
                    name="secondParentEmail"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentEmail}
                  />
                  {errors.secondParentEmail.length > 0 && (
                    <span className="error">{errors.secondParentEmail}</span>
                  )}
                </div>
                <div className="form-group mb-3 col-6">
                  <label htmlFor="secondParentPhone" className="control-label">
                    Antrojo t??vo/glob??jo tel.nr*:
                  </label>
                  <input
                    type="tel"
                    placeholder="Tel.nr"
                    className="form-control"
                    name="secondParentPhone"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentPhone}
                  />
                  {errors.secondParentPhone.length > 0 && (
                    <span className="error">{errors.secondParentPhone}</span>
                  )}
                </div>
                {this.state.secondParentPersonalCode > 0 ? (
                  <div className="form-group mb-3 col-6">
                    <label
                      htmlFor="secondParentPersonalCode"
                      className="control-label"
                    >
                      Antrojo t??vo/glob??jo asmens kodas*:
                    </label>
                    <input
                      type="text"
                      placeholder="Asmens kodas"
                      className="form-control"
                      name="secondParentPersonalCode"
                      onChange={this.handleChange}
                      noValidate
                      value={this.state.secondParentPersonalCode}
                    />
                    {errors.secondParentPersonalCode.length > 0 && (
                      <span className="error">
                        {errors.secondParentPersonalCode}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="form-group mb-3 col-6">
                    <label
                      htmlFor="secondParentPersonalCode"
                      className="control-label"
                    >
                      Antrojo t??vo/glob??jo asmens kodas*:
                    </label>
                    <input
                      type="text"
                      placeholder="Asmens kodas"
                      className="form-control"
                      name="secondParentPersonalCode"
                      onChange={this.handleChange}
                      noValidate
                    />
                    {errors.secondParentPersonalCode.length > 0 && (
                      <span className="error">
                        {errors.secondParentPersonalCode}
                      </span>
                    )}
                  </div>
                )}

                <div className="form-group mb-3 col-6">
                  <label htmlFor="secondParentCity" className="control-label">
                    Antrojo t??vo/glob??jo miestas*:
                  </label>
                  <input
                    type="text"
                    placeholder="Miestas"
                    className="form-control"
                    name="secondParentCity"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentCity}
                  />
                  {errors.secondParentCity.length > 0 && (
                    <span className="error">{errors.secondParentCity}</span>
                  )}
                </div>
                <div className="form-group mb-3 col-6">
                  <label htmlFor="secondParentStreet" className="control-label">
                    Antrojo t??vo/glob??jo gatv??*:
                  </label>
                  <input
                    type="text"
                    placeholder="Gatv??"
                    className="form-control"
                    name="secondParentStreet"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentStreet}
                  />
                  {errors.secondParentStreet.length > 0 && (
                    <span className="error">{errors.secondParentStreet}</span>
                  )}
                </div>

                <div className="form-group mb-3 col-6">
                  <label
                    htmlFor="secondParentHouseNumber"
                    className="control-label"
                  >
                    Antrojo t??vo/glob??jo namo numeris*:
                  </label>
                  <input
                    type="text"
                    placeholder="Namo numeris"
                    className="form-control"
                    name="secondParentHouseNumber"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentHouseNumber}
                  />
                  {errors.secondParentHouseNumber.length > 0 && (
                    <span className="error">
                      {errors.secondParentHouseNumber}
                    </span>
                  )}
                </div>
                <div className="form-group mb-3 col-4">
                  <label
                    htmlFor="secondParentFlatNumber"
                    className="control-label"
                  >
                    Antrojo t??vo/glob??jo butas:
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Butas"
                    className="form-control"
                    name="secondParentFlatNumber"
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentFlatNumber}
                  />
                </div>
                {this.state.secondParentNumberOfKids > 0 ? (
                  <div className="form-group mb-3 col-8">
                    <label
                      htmlFor="secondParentNumberOfKids"
                      className="control-label"
                    >
                      Kiek antrasis t??vas/glob??jas turi vaik??, kurie mokosi
                      pagal bendrojo ugdymo lavinimo programas?*
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Skai??ius"
                      className="form-control"
                      name="secondParentNumberOfKids"
                      onChange={this.handleChange}
                      noValidate
                      value={this.state.secondParentNumberOfKids}
                      onInvalid={(e) => {
                        e.target.setCustomValidity('??veskite vaik?? skai??i??.');
                      }}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                    {errors.secondParentNumberOfKids.length > 0 && (
                      <span className="error">
                        {errors.secondParentNumberOfKids}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="form-group mb-3 col-4">
                    <label
                      htmlFor="secondParentNumberOfKids"
                      className="control-label"
                    >
                      Kiek antrasis t??vas/glob??jas turi vaik??, kurie mokosi
                      pagal bendrojo ugdymo lavinimo programas?*
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Skai??ius"
                      className="form-control"
                      name="secondParentNumberOfKids"
                      onChange={this.handleChange}
                      noValidate
                      onInvalid={(e) => {
                        e.target.setCustomValidity('??veskite vaik?? skai??i??.');
                      }}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                    {errors.secondParentNumberOfKids.length > 0 && (
                      <span className="error">
                        {errors.secondParentNumberOfKids}
                      </span>
                    )}
                  </div>
                )}

                <div className="ml-4 form-check mb-3 col-12">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="secondParentStudying"
                    checked={this.state.secondParentStudying}
                    onChange={this.handleChange}
                    value={this.state.secondParentStudying}
                  />
                  <label
                    htmlFor="secondParentStudying"
                    className="form-check-label"
                  >
                    Antrasis t??vas/glob??jas mokosi bendrojo lavinimo mokykloje
                  </label>
                </div>

                {this.state.secondParentStudying ? (
                  <div className="mb-3">
                    <label
                      htmlFor="secondParentStudyingInstitution"
                      className="control-label"
                    >
                      Mokymosi ??staigos pavadinimas*:
                    </label>
                    <input
                      type="text"
                      placeholder="Mokymosi ??staiga"
                      className="form-control"
                      name="secondParentStudyingInstitution"
                      onChange={this.handleChange}
                      value={this.state.secondParentStudyingInstitution}
                      pattern="[a-zA-Z-z???????????????????????????????????? . - 0-9-]+"
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          '??veskite mokymosi ??staigos pavadinim??.'
                        );
                      }}
                      onInput={(e) => e.target.setCustomValidity('')}
                      required
                    />
                  </div>
                ) : (
                  <div> </div>
                )}
                <div className="ml-4 form-check mb-3 col-12">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="secondParentHasDisability"
                    id="hasDisability"
                    checked={this.state.secondParentHasDisability}
                    onChange={this.handleChange}
                    noValidate
                    value={this.state.secondParentHasDisability}
                  />
                  <label
                    htmlFor="secondParentHasDisability"
                    className="form-check-label"
                  >
                    Antrasis t??vas/glob??jas ma??esn?? nei 40% darbingumo lyg??
                  </label>
                </div>

                <div className="ml-4 form-check mb-3 col-12">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={
                      this.state.secondParentDeclaredResidenceSameAsLiving
                    }
                    name="secondParentDeclaredResidenceSameAsLiving"
                    id="secondParentDeclaredResidenceSameAsLiving"
                    onChange={this.handleChange}
                    value={this.state.secondParentDeclaredResidenceSameAsLiving}
                  />
                  <label
                    htmlFor="secondParentDeclaredResidenceSameAsLiving"
                    className="form-check-label"
                  >
                    Jei deklaruota gyvenamoji vieta sutampa, pa??ym??kite.
                  </label>
                </div>
                {this.state.secondParentDeclaredResidenceSameAsLiving ? null : (
                  <div className="form-row">
                    <div className="form-group mb-3 col-6 mt-3">
                      <label
                        htmlFor="secondParentDeclaredCity"
                        className="control-label"
                      >
                        Antrojo t??vo/glob??jo deklaruotas miestas*:
                      </label>
                      <input
                        type="text"
                        placeholder="Deklaruotas miestas"
                        className="form-control"
                        name="secondParentDeclaredCity"
                        onChange={this.handleChange}
                        value={this.state.secondParentDeclaredCity}
                        pattern="[a-zA-Z-z???????????????????????????????????? -]+"
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            '??veskite deklaruot?? miest?? tinkamu formatu.'
                          );
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-6 mt-3">
                      <label
                        htmlFor="secondParentDeclaredStreet"
                        className="control-label"
                      >
                        Antrojo t??vo/glob??jo deklaruota gatv??*:
                      </label>
                      <input
                        type="text"
                        placeholder="Deklaruota gatv??"
                        className="form-control"
                        name="secondParentDeclaredStreet"
                        onChange={this.handleChange}
                        value={this.state.secondParentDeclaredStreet}
                        pattern="^[a-zA-z???????????????????????????????????? ]+[- a-zA-z????????????????????????????????????0-9 . -  ]*"
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            '??veskite deklaruot?? gatv?? tinkamu formatu.'
                          );
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                      {errors.secondParentDeclaredStreet.length > 0 && (
                        <span className="error">
                          {errors.secondParentDeclaredStreet}
                        </span>
                      )}
                    </div>

                    <div className="form-group mb-3 col-6">
                      <label
                        htmlFor="secondParentDeclaredHouseNumber"
                        className="control-label"
                      >
                        Antrojo t??vo/glob??jo deklaruotas namo numeris*:
                      </label>
                      <input
                        type="text"
                        placeholder="Deklaruotas namo numeris"
                        className="form-control"
                        name="secondParentDeclaredHouseNumber"
                        onChange={this.handleChange}
                        value={this.state.secondParentDeclaredHouseNumber}
                        pattern="^[1-9]+[ a-zA-Z 0-9 ]*"
                        onInvalid={(e) => {
                          e.target.setCustomValidity(
                            '??veskite deklaruot?? namo numer?? tinkamu formatu, pvz.: 1A'
                          );
                        }}
                        onInput={(e) => e.target.setCustomValidity('')}
                        required
                      />
                    </div>
                    <div className="form-group mb-3 col-6">
                      <label
                        htmlFor="secondParentDeclaredFlatNumber"
                        className="control-label"
                      >
                        Antrojo t??vo/glob??jo deklaruotas butas:
                      </label>
                      <input
                        type="number"
                        min="1"
                        placeholder="Deklaruotas butas"
                        className="form-control"
                        name="secondParentDeclaredFlatNumber"
                        onChange={this.handleChange}
                        value={this.state.secondParentDeclaredFlatNumber}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}

            <div className="mt-3 form-group mb-3 col-12">
              {' '}
              * - privalomi laukai
            </div>
            <div className="child mb-1 mt-5 formChild">
              <button type="submit" className="child btn ">
                Atnaujinti
              </button>
            </div>
          </form>

          <div className="child">
            <button
              id="deleteChildData"
              className="child btn mt-1"
              data-toggle="modal"
              data-target={`#staticBackdrop${this.state.id}`}
              value={this.state.id}
            >
              I??trinti vaiko duomenis
            </button>
            <ModalComponentChildren
              childId={this.state.id}
              firstname={this.state.firstname}
              lastname={this.state.lastname}
              deleteChild={this.deleteChild}
            />
          </div>
        </div>
      </div>
    );
  }
}
