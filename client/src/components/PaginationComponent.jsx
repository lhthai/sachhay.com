import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom'

const PaginationComponent = props => {
    const { count, url, currentPage } = props;
    const totalPages = Math.ceil(count / 20)

    const calPages = () => {
        let startPage, endPage;
        if (totalPages <= 10) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6 || currentPage === undefined) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4
            }
        }
        return renderPages(startPage, endPage)
    }
    const renderPages = (startPage, endPage) => {
        let items = [];
        for (let i = startPage; i <= endPage; i++) {
            items.push(
                <PaginationItem active={i.toString() === currentPage ? true : false}>
                    <Link to={url + i}>
                        <PaginationLink>{i}</PaginationLink>
                    </Link>
                </PaginationItem>
            )
        }
        return items;
    }
    if (totalPages <= 1) {
        return null
    }
    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem disabled={currentPage === '1' || currentPage === undefined ? true : false}>
                <Link to={url + 1}>
                    <PaginationLink>First</PaginationLink>
                </Link>
            </PaginationItem>
            <PaginationItem disabled={currentPage === '1' || currentPage === undefined ? true : false}>
                <Link to={url + ((parseInt(currentPage) - 1) >= 1 ? (parseInt(currentPage) - 1) : 1)} >
                    <PaginationLink>Previous</PaginationLink>
                </Link>
            </PaginationItem>
            {calPages()}
            <PaginationItem disabled={currentPage === totalPages.toString() ? true : false}>
                <Link to={url + ((parseInt(currentPage) + 1) <= totalPages ? (parseInt(currentPage) + 1) : totalPages)}>
                    <PaginationLink>Next</PaginationLink>
                </Link>
            </PaginationItem >
            <PaginationItem disabled={currentPage === totalPages.toString() ? true : false}>
                <Link to={url + totalPages}>
                    <PaginationLink>Last</PaginationLink>
                </Link>
            </PaginationItem>
        </Pagination>
    )
}

export default PaginationComponent
