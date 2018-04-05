import { Paper, SEOAssessor, ContentAssessor } from 'yoastseo'
import zipObject from 'lodash/zipObject'
import omit from 'lodash/omit'
import Jed from 'jed'
import Presenter from './Presenter'
import snarkdown from 'snarkdown'

export default class App {

    constructor() {
        this.contentAssessor = new ContentAssessor(this.i18n())
        this.seoAssessor = new SEOAssessor(this.i18n())

        this.paper = new Paper()

        this.presenter = new Presenter()

        this.assessContent(this.paper)
        this.assessSEO(this.paper)
    }

    i18n() {
        return new Jed({
            domain: `js-text-analysis`,
            locale_data: {
                "js-text-analysis": { "": {} }
            }
        })
    }

    setContent(content) {

        content.text = snarkdown(content.text)

        const data = Object.assign({}, {
            text: this.paper.getText(),
            keyword: this.paper.getKeyword(),
            description: this.paper.getDescription(),
            title: this.paper.getTitle(),
            titleWidth: this.paper.getTitleWidth(),
            url: this.paper.getUrl(),
            locale: this.paper.getLocale(),
            permalink: this.paper.getPermalink(),
        }, content)
        
        this.paper = new Paper(data.text, omit(data, 'text'))

        this.assessContent(this.paper)
        this.assessSEO(this.paper)
    }

    assessContent(paper) {
        this.contentAssessor.assess(paper)
    }

    assessSEO(paper) {
        this.seoAssessor.assess(paper)
    }

    getScores() {
        return {
            seo: this.presenter.getScores(this.seoAssessor),
            content: this.presenter.getScores(this.contentAssessor)
        }
    }

    getScoresAsHTML(h) {
        return this.presenter.getScoresAsHTML(h, this.getScores());
    }

}
