import React from 'react';
import { Form } from '../components/export';

export default class ItemAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.state = {
      current: 0,
      image: [],
      imagePreviewUrl: [],
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = document.forms.itemAdd;
    this.props.createItem({
      name: form.name.value,
      image: [...this.state.image],
    });

    // Clear the form and state for the next input.
    this.setState({
      image: [],
      imagePreviewUrl: [],
    });
  }

  handleImageChange(e) {
    e.preventDefault();
    const maxCount = this.props.maxCount;
    const { image, imagePreviewUrl } = this.state;
    let current = image.length + 1;
    console.log(current);

    if (current < maxCount) {
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        this.setState((prevState) => ({
          image: [...prevState.image, file],
          imagePreviewUrl: [...prevState.imagePreviewUrl, reader.result],
          current,
        }));
      };

      reader.readAsDataURL(file);
    } else {
      alert(`${current} pictures limit.`);
    }
  }

  render() {
    const { imagePreviewUrl, current } = this.state;
    const { type } = this.props;
    const isInvalid = current === 0;
    const conditionalText =
      type === 'Rent' ? (
        <Form.Title>Add picture For Rent by Owner Listing</Form.Title>
      ) : (
        <Form.Title>Add picture For Sale by Owner Listing</Form.Title>
      );

    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = imagePreviewUrl.map((imgUrl, index) => (
        <img
          key={index}
          src={imgUrl}
          alt={`Image ${index + 1}`}
          style={{ height: '200px', width: '200px' }}
        />
      ));
    }

    return (
      <Form style={{ backgroundColor: 'grey' }}>
        {conditionalText}
        <Form.Base name="itemAdd" onSubmit={this.handleSubmit}>
          Add image for your listing, the first image will be the primary picture.
          <p></p>
          <table>
            <tbody>
              <tr>
                <td>
                  <input type="file" onChange={this.handleImageChange} />
                </td>
              </tr>
              <tr>
                <td>{$imagePreview}</td>
              </tr>
            </tbody>
          </table>
          <p></p>
          <Form.Submit type="submit" disabled={isInvalid}>
            Add
          </Form.Submit>
        </Form.Base>
      </Form>
    );
  }
}