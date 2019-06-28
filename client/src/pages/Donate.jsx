import React from 'react'
import { Container, Row, Card, CardBody, CardText } from 'reactstrap'

import MainLayout from '../components/Layout/MainLayout'

const Donate = props => {
    return (
        <MainLayout>
            <Container>
                <Row className="bg-primary text-white p-2">Ủng hộ sachhay.com</Row>
                <Card className="border-0">
                    <CardBody>
                        <CardText><strong>Hi các bạn,</strong></CardText>
                        <CardText>Năm 2014, tại một góc quán coffee ở San Francisco,  những dòng code đầu tiên cho sachvui.com được hình thành, và để đến ngày hôm nay sachvui.com đã có những cuộc cách mạng, khi được các bạn kỹ thuật ở Việt Nam nâng cấp, với hệ thống crawl dữ liệu tự động kết hợp với hệ thống phân loại nội dung bằng Machine Learning.</CardText>
                        <CardText>Với những cải tiến đó hiện tại sachvui.com đã có:</CardText>
                        <CardText>
                            <ul>
                                <li>5 máy chủ phân tán: lưu trữ ebook, ảnh, nội dung...</li>
                                <li>Gần 200.000 chương sách và truyện </li>
                                <li>Hơn 300.000 ảnh (ảnh truyện tranh, ảnh minh hoạ trong sách)</li>
                                <li>Tổng băng thông hằng tháng hơn 12.000 GB</li>
                            </ul>
                        </CardText>
                        <CardText>(Thông tính tính đến tháng 12/2018)</CardText>
                        <CardText>Chính vì vậy, để website tiếp tục duy trì và phát triển, các bạn hãy chia sẻ và giới thiệu sachvui.com đến với nhiều người hơn, đó là nguồn động lực to lớn nhất dành cho bọn mình.</CardText>
                        <CardText>Ngoài ra, nếu bạn <strong>đã đi làm và có nguồn tài chính ổn định</strong> muốn đóng góp xin ủng hộ đội kỹ thuật qua link sau: <a href="https://www.paypal.me/sachvui">https://www.paypal.me/sachvui</a></CardText>
                        <CardText><strong>Chú ý: Việc đóng góp tiền cho sachvui.com là <span className="text-danger">KHÔNG</span> bắt buộc, số tiền đóng góp sẽ dành để động viên đội kỹ thuật, chi phí máy chủ mình (admin) xin duy trì mãi mãi.</strong></CardText>
                        <CardText><strong>Chân thành cảm ơn các bạn rất nhiều!</strong></CardText>
                    </CardBody>
                </Card>
            </Container>
        </MainLayout>
    )
}

export default Donate
