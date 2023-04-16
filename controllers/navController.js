const mysql = require("../SqlManager");

const page_index = (req, res) => {
    res.render('index', { title: 'The Stairway' });
};

const page_about = (req, res) => {
    res.render('about', {title: 'About The Stairway'});
};

const page_doc = (req, res) => {
    res.render('documentation', {title: 'Documentation'})
};

const page_download = (req, res) => {
    res.render('download', {title: 'Download The Stairway', })
};

const page_feedback = (req, res) => {
    mysql.get_feedback((result) => {
        res.render('feedback', {title: 'Feedback', comments: result});
    });
};

const page_feedback_create = (req, res) => {
    mysql.create_feedback(req.body.name, req.body.rating, req.body.comment);
    mysql.get_feedback((result) => {
        res.render('feedback', {title: 'Feedback', comments: result});
    });
}

const page_member = (req, res) => {
    res.render('member', {title: 'Member'})
}

const page_cgu = (req, res) => {
    res.render('cgu', {title: 'CGU'})
}

const page_privacy = (req, res) => {
    res.render('privacy', {title: 'Privacy'})
}

const page_legal = (req, res) => {
    res.render('legal', {title: 'Legal'})
}

const page_letter = (req, res) => {
    mysql.get_newsletters((result) => {
        res.render('newsletter', {title: 'Newsletter', articles: result})
    })
}

const page_article = (req, res) => {
    const id  = req.params.id;
    console.log(id);
    mysql.get_article(id, (result) => {
        if(result.length <= 0){
            res.render('404', {title: 'Page not found'})
        } else {
            article = result[0];
            const datePropre = article.creation_date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
            res.render('article', {title: article.title, content: article.content, date: datePropre})
        }
    });
}

module.exports = { page_index, page_about, page_doc, page_download, page_feedback, page_member, page_cgu, page_privacy, page_legal, page_letter, page_feedback_create, page_article};