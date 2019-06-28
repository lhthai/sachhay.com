import React from 'react'
import { Container, Row, Card, CardBody, CardText } from 'reactstrap'

import MainLayout from '../components/Layout/MainLayout'

const Report = props => {
    return (
        <MainLayout>
            <Container>
                <Row className="bg-primary text-white p-2">Báo cáo vi phạm</Row>
                <Card className="border-0">
                    <CardBody>
                        <CardText>Hiện tại với số lượng cộng tác viên viết bài và chia sẻ Ebook khá lớn, nên chúng tôi không thể kiểm soát được nội dung đưa lên, chính vì thế nếu các bạn thấy các vi phạm bao gồm :</CardText>
                        <CardText>
                            <ul>
                                <li><strong>Phản động, xuyên tạc đường lối, chủ trương của Đảng và Nhà nước.</strong></li>
                                <li>Tài liệu khiêu dâm, đồi truỵ .</li>
                                <li>Thông tin cá nhân và bí mật.</li>
                                <li>Hoạt động bất hợp pháp.</li>
                            </ul>
                        </CardText>
                        <CardText> Các bạn vui lòng gửi Email về sachvui.com@gmail.com , kèm theo nội dung vi phạm và văn bản yêu cầu nếu có .</CardText>
                        <CardText>- Hoặc nhắn tin tại fanpage : <a href="https://www.facebook.com/thuviensachvietnam">https://www.facebook.com/thuviensachvietnam</a> </CardText>
                    </CardBody>
                </Card>
            </Container>
        </MainLayout>
    )
}

export default Report
