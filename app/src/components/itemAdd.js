import React from 'react';
import { Form } from '../components/export';

export default class ItemAdd extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            current: 0,
            image: [],
            imagePreviewUrl: []
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        let form = document.forms.itemAdd;
        this.props.createItem({
            name: form.name.value,
            image: [...this.state.image]
        });
        // Clear the form and state for the next input.

        this.state.image = null;
        this.state.imagePreviewUrl = null;
    }

    handleImageChange(e) {
        e.preventDefault();
        const maxCount = this.props.maxCount;
        this.state.current = this.state.image.length;
        this.state.current += 1;
        console.log(this.state.current);
        if(this.state.current < maxCount){
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    image: [...this.state.image, file],
                    imagePreviewUrl: [...this.state.imagePreviewUrl, reader.result]
                });
            }
            reader.readAsDataURL(file)
        }else{
            alert(this.state.current + " pictures limit.");
        }
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (imagePreviewUrl.map(imgUrl => <img key="1" src={imgUrl} style={{height: "200px", width: "200px"}}/>));
        } else {
            $imagePreview = null;
        }
        const isInvalid = this.state.current === 0;
        console.log(isInvalid)
        const conditionalText = this.props.type === "Rent" ? <Form.Title>Add picture For Rent by Owner Listing</Form.Title> : <Form.Title>Add picture For Sale by Owner Listing</Form.Title>;
        return (
            <Form style={{backgroundColor: "grey"}}>
                {conditionalText}
                <Form.Base name="itemAdd" onSubmit={this.handleSubmit}>
                    Add image for your listing, the first image will be the primary picture.
                    <p></p>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <input type="file" onChange={(e) => this.handleImageChange(e) } />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                {$imagePreview}
                            </td>
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