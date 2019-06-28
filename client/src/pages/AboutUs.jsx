import React from 'react'

import MainLayout from '../components/Layout/MainLayout'

import { Container, Row } from 'reactstrap'

const AboutUs = props => {
    return (
        <MainLayout>
            <Container>
                <Row className="bg-primary text-white p-2">Lời Nói Đầu</Row>
                <Row className="p-2">
                    <p>Chào các bạn ,</p>
                    <p>Thư viện ebook sachvui.com ra đời với mục đích chia sẻ ebook đến với mọi người , hoàn toàn miễn phí , đa số mọi bài viết đều có định dạng hỗ trợ các bạn đọc sách trên smartphone  hoặc máy đọc sách (mobi ,epub ,prc) và hiện bọn mình đang tiếp tục code thêm chức năng cho web, để sắp tới mọi người có thể đăng kí thành viên và cùng chia sẻ những ebook hay  .</p>
                    <p>Chúc các bạn vui vẻ !</p>
                </Row>
            </Container>

        </MainLayout>
    )
}

export default AboutUs
