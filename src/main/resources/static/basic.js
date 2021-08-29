
$(document).ready(function () {

    // id가 query 인 녀석 위에서 엔터를 누르면 execSearch() 함수를 실행하라는 뜻입니다.
    $('#query').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearch();
        }
    });
    // id가 query_title 인 녀석 위에서 엔터를 누르면 execSearchReview() 함수를 실행하라는 뜻입니다.
    $('#query_title').on('keypress', function (e) {
        if (e.key == 'Enter') {
            execSearchReview();
        }
    });

})

// 등록된 리뷰를 책제목으로 검색해 결과를 요청한다.
function execSearchReview(){
    // 1. 검색창의 입력값을 가져온다.
    let title = $('#query_title').val();

    // 2. 검색창 입력값을 검사하고, 입력하지 않았을 경우 focus.
    if (title == '') {
        alert('검색어를 입력해주세요');
        $('#query_title').focus();
        return;
    }

    // 1. GET /api/books 요청
    $.ajax({
        type: 'GET',
        url: `/api/books/${title}`,
        success: function (response) {
            // 2. 리뷰 목록 비우기
            $('#product-container').empty();
            console.log(response.length)
            // 3. for 문마다 리뷰 HTML 만들어서 리뷰 목록에 붙이기!
            for (let i = 0; i < response.length; i++) {
                let product = response[i];
                let tempHtml = addProductItem(product);
                $('#product-container').append(tempHtml);
            }
        }
    })

}

// 네이버책 api 검색 결과 요청
function execSearch() {
    /**
     * 검색어 input id: query
     * 검색결과 목록: #search-result-box
     * 검색결과 HTML 만드는 함수: addHTML
     */
    // 1. 검색창의 입력값을 가져온다.
    let query = $('#query').val();

    // 2. 검색창 입력값을 검사하고, 입력하지 않았을 경우 focus.
    if (query == '') {
        alert('검색어를 입력해주세요');
        $('#query').focus();
        return;
    }

    // 3. GET /api/search?query=${query} 요청
    $.ajax({
        type: 'GET',
        url: `/api/search?query=${query}`,
        success: function (response) {
            $('#search-result-box').empty();
            // 4. for 문마다 itemDto를 꺼내서 HTML 만들고 검색결과 목록에 붙이기!
            for (let i = 0; i < response.length; i++) {
                let itemDto = response[i];
                console.dir(itemDto);
                let tempHtml = addHTML(itemDto);
                $('#search-result-box').append(tempHtml);
            }
        }
    })
}

//네이버 책 api 검색 결과에 대한 HTML
function addHTML(itemDto) {
    /**
     * class="search-itemDto" 인 녀석에서
     * image, title, lprice, addProduct 활용하기
     * 참고) onclick='addProduct(${JSON.stringify(itemDto)})'
     */
    return `<div class="search-itemDto">
        <div class="search-itemDto-left">
            <img src="${itemDto.image}" alt="">
        </div>
        <div class="search-itemDto-center">
            <div>${itemDto.title}</div>
            <div class="price">
            ${itemDto.publisher}</div>
        </div>
        <div class="search-itemDto-right">
            <img src="../images/icon-save.png" alt="" onclick='addProduct(${JSON.stringify(itemDto)})'>
        </div>
    </div></hr>`;

}


// 리뷰 작성 생성
function addProduct(itemDto) {
    
    // 페이지에 선택한 책의 정보 전달
    $("#image").attr("src",`${itemDto.image}`);
    $("#title").html(`${itemDto.title}`);
    $("#author").html(`${itemDto.author}`);
    $("#publisher").html(`${itemDto.publisher}`);

    // 네이버 책 api 검색 결과 숨기기
    $('#search-result-box').empty();

    // 선택한 책에 대한 리뷰 작성 보이기
    $('#container').show();


}

// 네이버 책 api 검색 결과 출력
function showProduct() {
    /**
     * 관심상품 목록: #product-container
     * 검색결과 목록: #search-result-box
     * 관심상품 HTML 만드는 함수: addProductItem
     */

    // 전체리뷰 조회하기 클릭시 이전에 검색했던 값이 input에 남아 있다면 지운다.
    document.getElementById("query_title").value ="";

    // 1. GET /api/books 요청
    $.ajax({
        type: 'GET',
        url: '/api/books',
        success: function (response) {
            // 2. 관심상품 목록, 검색결과 목록 비우기
            $('#product-container').empty();
            // $('#search-result-box').empty();
            // 3. for 문마다 관심 상품 HTML 만들어서 관심상품 목록에 붙이기!
            console.log("response길이"+response.length);
            for (let i = 0; i < response.length; i++) {
                let product = response[i];
                let tempHtml = addProductItem(product);
                $('#product-container').append(tempHtml);
            }
        }
    })
}

// 리뷰수정
// id : 등록된 리뷰의 id 
// review : 기존에 등록되어있던 리뷰
function  editReview(id,review){
    // 1. myreview에 변경된 리뷰 값을 받는다.
    let myreview = prompt("리뷰를 수정하세요",[review]);

    if (myreview == '') {
        alert('한줄 리뷰를 입력해주세요');
        return;
    }

    // 2. PUT /api/books/${id} 에 data를 전달한다.
    $.ajax({
        type: "PUT",
        url: `/api/books/${id}`,
        contentType: "application/json",
        data: JSON.stringify({myreview: myreview}),
        success: function (response) {
        // 3. 성공적으로 수정되었음을 알리는 alert를 띄운다.
            alert('성공적으로 수정되었습니다.');
        // 4. 창을 새로고침한다. window.location.reload();
            window.location.reload();
        }
    })



}


// 리뷰삭제
// id : 등록된 리뷰의 id
function deleteReview(id){
        // 1. DELETE /api/books/${id}를 요청한다.
        $.ajax({
            type: "DELETE",
            url: `/api/books/${id}`,
            success: function () {
                // 2. 성공적으로 수정되었음을 알리는 alert를 띄운다.
                alert('성공적으로 삭제되었습니다.');
                // 3. 창을 새로고침한다. window.location.reload();
                window.location.reload();
            }
        })
}

// 리뷰조회
function addProductItem(product) {

    // 책의 이미지, 제목, 리뷰, edit 버튼, delete 버튼
    // edit 버튼 클릭시 editReview 함수 호출
    // delete 버튼 클릭시 deleteReview 함수 호출
    return `<div class="product-card" id="content1" >
                <div class="card-header">
                    <img class="bookimage" src="${product.image}" alt="">
                </div>
                <div class="card-body">
                    <div class="contentname title" >
                        ${product.title}
                    </div>
                    <div class="contentarticle">
                       ${product.myreview}
                       <img src="images/edit.png" alt="" onclick="editReview('${product.id}','${product.myreview}')">
                       <img src="images/delete.png" alt="" onclick="deleteReview('${product.id}')">
                    </div>
                </div>
            </div>`;
}

// 리뷰등록
function setMyreview() {

    // 1. id가 myreview 인 input 태그에서 값을 가져온다.
    let myreview = $('#myreview').val();

    // 2. 만약 값을 입력하지 않았으면 alert를 띄우고 중단한다.
    if (myreview == '') {
        alert('한줄 리뷰를 입력해주세요');
        return;
    }

    // 3. 등록할 리뷰에 대한 dictionary 생성
    review = {
        "author":$('#author').text(),
        "image":$("#image").attr("src"),
        "myreview":myreview,
        "publisher":$("#publisher").text(),
        "title":$("#title").text()
    }

    // 4. review 딕셔너리를 전달해서 db 생성
    $.ajax({
        type: "POST",
        url: '/api/books',
        contentType: "application/json",
        data: JSON.stringify(review),
        success: function () {
            // 5. 모달창을 종료한다.
            $('#container').removeClass('active');
            // 6. 성공적으로 등록되었음을 알리는 alert를 띄운다.
            alert('성공적으로 등록되었습니다.');
            // 7. 창을 새로고침한다. window.location.reload();
            window.location.reload();
        }
    })
}