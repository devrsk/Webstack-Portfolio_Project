import React from 'react';
import { Footer } from '../components/export';

function FooterContainer() {
    return (
        <Footer>
            <Footer.Title>Questions? Contact us.</Footer.Title>
            <Footer.Break />
            <Footer.Row>
                <Footer.Column>
                    <Footer.Link href="#">FAQs</Footer.Link>
                    <Footer.Link href="#">Investor Relations</Footer.Link>
                    <Footer.Link href="#">Ways to Watch</Footer.Link>
                    <Footer.Link href="#">Corporate Information</Footer.Link>
                    <Footer.Link href="#">Rent Originals</Footer.Link>
                </Footer.Column>
                
                <Footer.Column>
                    <Footer.Link href="#">Help Centre</Footer.Link>
                    <Footer.Link href="#">Jobs</Footer.Link>
                    <Footer.Link href="#">Terms of Use</Footer.Link>
                    <Footer.Link href="#">Contact Us</Footer.Link>
                </Footer.Column>
                
                <Footer.Column>
                    <Footer.Link href="#">Account</Footer.Link>
                    <Footer.Link href="#">Reedem gift cards</Footer.Link>
                    <Footer.Link href="#">Priacy</Footer.Link>
                    <Footer.Link href="#">Speed Test</Footer.Link>
                </Footer.Column>
                
                <Footer.Column>
                    <Footer.Link href="#">Media Centre</Footer.Link>
                    <Footer.Link href="#">Buy gift cards</Footer.Link>
                    <Footer.Link href="#">Cookie Preferences</Footer.Link>
                    <Footer.Link href="#">Legal Notices</Footer.Link>
                </Footer.Column>

                <Footer.Column>
                    <Footer.Link href="mailto:raheem.salifu@gmail.com" ><i className="far fa-envelope"></i></Footer.Link>
                    <Footer.Link href="https://facebook.com"><i className="fab fa-facebook"></i></Footer.Link>
                    <Footer.Link href="https://twitter.com" ><i className="fab fa-twitter"></i></Footer.Link>
                    <Footer.Link href="https://github.com"  ><i className="fab fa-github"></i></Footer.Link>
                </Footer.Column>
            </Footer.Row>
            <Footer.Break />
            <Footer.Text>PropertyPro </Footer.Text>
        </Footer>
    )
}

export default FooterContainer