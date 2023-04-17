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
        mysql.compute_mean((mean) => {
            res.render('feedback', {title: 'Feedback', comments: result, mean: mean});
        })
    });
};

const page_feedback_create = (req, res) => {
    let rate = req.body.rating;
    let comment = req.body.comment;
    let name = req.body.name;
    if(rate > 5 || rate < 1 || comment == "" || name == ""){
        res.render('404');
    } else {
        mysql.create_feedback(name, rate, comment);
        res.redirect('/feedback');
    }
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