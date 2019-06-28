import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons'
import { Container, Row, Card, CardBody, CardTitle, CardText } from 'reactstrap'

import MainLayout from '../components/Layout/MainLayout'

const Contact = props => {
    return (
        <MainLayout>
            <Container>
                <Row className="bg-primary text-white p-2">Liên hệ</Row>
                <Card className="border-0">
                    <CardBody>
                        <CardText><FontAwesomeIcon icon={faEnvelope} /> : sachhay.com@gmail.com</CardText>
                        <CardText><FontAwesomeIcon icon={faAddressCard} /> : California Street, Suite 586, San Francisco, CA 58168</CardText>
                        <CardText><FontAwesomeIcon icon={faPhone} /> : +1-0415-888-xxxx</CardText>
                    </CardBody>
                    
                    <CardBody>
                        <CardTitle><strong>Chú ý</strong></CardTitle>
                        <CardText>- Hiện tại website đang dùng hệ thống Craw tự động nên <strong>không</strong> tuyển thêm người post bài.</CardText>
                        <CardText>- Sachvui.com <strong>không có dự án làm ebook nào hết!</strong> tất cả đều được lấy từ dự án của nhóm và người khác, nên <strong>không</strong> tuyển người làm ebook.</CardText>
                        <CardText>- Sachvui.com không thu phí hay gạ gẫm đóng góp từ email hay PM riêng cho ai hết! <strong>Cận thận lừa đảo.</strong></CardText>
                    </CardBody>

                    <CardBody>
                        <CardTitle><strong>Các nội dung email sau đây sẻ được hồi đáp</strong></CardTitle>
                        <CardText>- Báo cáo nội dung xuyên tạc chống phá nhà nước</CardText>
                        <CardText>- Góp ý, báo lỗi website hoặc ebook </CardText>
                        <CardText>- Đóng góp ebook</CardText>
                    </CardBody>

                    <CardBody>
                        <CardTitle><strong>Các nội dung email sau đây sẻ <span className="text-danger">KHÔNG</span> được hồi đáp</strong></CardTitle>
                        <CardText>- Hợp tác quảng cáo CPM, CPC, CPA , Pop-up, Quảng cáo ăn theo sản phẩm.</CardText>
                        <CardText>- Hỏi mua sách</CardText>
                        <CardText>- Hỏi đáp kiến thức</CardText>
                        <CardText>- Xin ebook, tài liệu</CardText>
                    </CardBody>
                </Card>
               

            </Container>
        </MainLayout>
    )
}

export default Contact
