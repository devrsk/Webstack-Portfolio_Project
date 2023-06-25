import React from 'react';
import { Container,Base,Button,Card,Text,Image,ImageContainer} from './styles/style';
function ApplicationForm({children, ...restProps}){
    return(
        <Container {...restProps}>
            {children}
            </Container>
    )
}
export default ApplicationForm

ApplicationForm.Base = function ApplicationFormBase({children, ...restProps}){
    return(
        <Base {...restProps}>
            {children}
        </Base>
    )
}

ApplicationForm.Button = function ApplicationFormButton({id,onclick,name, Buyer_ID, children, ...restProps}){
    return(
        <Button onClick = {()=>onclick(id,name,Buyer_ID)} {...restProps} >
            {children}
        </Button>
    )
}
ApplicationForm.Card = function ApplicationFormRow({children, ...restProps}){
    return(
        <Card {...restProps}>
            {children}
        </Card>
    )
}
ApplicationForm.Text = function ApplicationText({children, ...restProps}){
    return(
        <Text {...restProps}>
            {children}
        </Text>
    )
}

ApplicationForm.Image = function ApplicationFormImage({src,alt,children, ...restProps}){
    return(
        <Image  src = {src} alt = {alt} {...restProps}>
            {children}
        </Image>
    )
}

ApplicationForm.ImageContainer = function ApplicationFormImage({children, ...restProps}){
    return(
        <ImageContainer {...restProps}>
            {children}
        </ImageContainer>
    )
}