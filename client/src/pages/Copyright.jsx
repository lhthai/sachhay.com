import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { Container, Row } from 'reactstrap'

import MainLayout from '../components/Layout/MainLayout'

const Copyright = props => {
    return (
        <MainLayout>
            <Container>
                <Row className="bg-primary text-white p-2">Bản quyền</Row>
                <Row>
                    <FontAwesomeIcon icon={faCopyright} size="5x" className="mx-auto my-3"/>
                </Row>
                
                <p>
                    Toàn bộ ebook có trên website đều có bản quyền thuộc về tác giả, <strong>Sachvui.Com khuyến khích các bạn nếu có khả năng hãy mua sách để ủng hộ tác giả.</strong><br/>
                    Ebook được sưu tập và tổng hợp từ các nguồn trên internet ( tve , e-thuvien , tinhte  .... ) và các dự án ebook của cộng đồng. Chúng tôi chỉ chia sẻ lại cho cộng đồng ,và không bán những ebook này, toàn bộ ebook có trên web đều được chia sẻ miễn phí.<br/>
                    Mọi cá nhân hay tổ chức nếu muốn in ấn hay phát hành sách từ Sachvui.com phải được sự cho phép của tác giả, chúng tôi không khuyến khích việc thương mại hóa các ebook này.
            </p>
            </Container>
        </MainLayout>
    )
}

export default Copyright
