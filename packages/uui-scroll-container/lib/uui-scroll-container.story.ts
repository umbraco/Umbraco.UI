import '../define';

import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  id: 'uui-scroll-container',
  title: 'Displays/Scroll Container',
  component: 'uui-scroll-container',
};

export const Overview: Story = () =>
  html`
    <uui-scroll-container style="width:400px; height:400px;">
      <h3>You should try to be up here</h3>
      <p>
        clumsy, ok thank you for waiting<br />
        Let's see if we can get this up and running<br />
        umm we gotta a lot to cover over the next one and a half hour<br />
        so errr, Say cheese, ahh awesome, what a wonderful day
      </p>
      <p>
        Thank you very much for coming errr <br />
        welcome to the biggest Codegarden ever<br />
        without a doubt our biggest ever<br />
        the biggest err ever Codegarden<br />
        we are more than 380 people err today, <br />which is err about a little
        more than twenty times the people at the first Codegarden<br />
        err this year there is more than 700 people, <br />which makes it more
        than 30 times bigger than the very first one<br />
        err so awesome to be back at the err the err Umbraco festival
      </p>
      <p>
        Hey, before we start I just want to be the first one to use the 'hi-five
        I suck' tag<br />
        the only thing that makes this very different from my normal Christmas
        Eve<br />
        is that I don't get sweaters like these from my inlaws which makes it
        even better...<br />
        so the book will be a little delayed, and that's my fault
      </p>
      <p>
        ahhh it's amazing to be back <br />
        umm I've really been looking forward to this<br />
        I love Codegarden is because we're all together<br />
        all the people you talk to on the forums, maillist people suddenly you
        see them in real life<br />
        this is fantastic<br />
        but we just have so much to share
      </p>
      <p>
        You should try to be up here<br />
        it's scary and awesome at the same time
      </p>
      <p>
        so let's err let's start<br />
        perhaps always people say<br />
        Doug has this weird thing on my machine, I can't see anything<br />
        aha he has notes, he's been preparing<br />
        which I have of course...
      </p>
      <p>
        You should try to be up here<br />
        I was here I think as the slide says quite a number of years ago<br />
        We have slides and we have demos and there is so much that can go
        wrong<br />
        err which is awesome
      </p>
      <p>
        So back in the day Per and I did demos and they failed<br />
        and then we were told you can't fail in a keynote<br />
        so then we made boring slideshow demos<br />
        and pre-recorded videos<br />
        and almost no dangerous demos <br />
        and we are so bored<br />
        we need stress<br />
        we need panic<br />
        we need to smell bad afterwards<br />
        and then Pete Duncanson isn't here<br />
        so we are going to have a buffet of Yellow Screens of Death
      </p>
      <p>You should try to be up here</p>
      <p>
        umm<br />
        those hats are still in use, err at the HQ you have to wear the hat
        <br />
        if you forgot to log out of the computer <br />
        and someone gets to post in Slack that you are giving out free beer,
        <br />
        you have to wear the hat.
      </p>
      <p>
        I am really excited that so many people have come here<br />
        it's pretty wild to just stand up here<br />
        one of the reasons I love Codegarden is because we're all together<br />
        all the people you talk to on the forums, maillist people<br />
        suddenly you see them in real life and for me, that's kinda like
        Christmas Eve
      </p>
      <p>
        just think about it for a second <br />
        people gathered here<br />
        all passionate about Umbraco<br />
        travelled across the world to share our ideas, our thoughts and maybe
        even umm... some code<br />
        I really think it's crazy
      </p>
      <p>
        you should try to be up here <br />
        it's the most awesome sight ever
      </p>
      <p>Are you ready?</p>
      <p>I don't know if you can see the slides now?</p>
      <p>
        Community and Infinity<br />
        Are you ready?<br />
        don't worry it's not as abstract as it sounds
      </p>
      <p>there is a long break after this one so err</p>
      <p>and now I have transitions</p>
    </uui-scroll-container>
  `;

export const NotEnoughContent: Story = () =>
  html`
    <uui-scroll-container style="width:400px; height:400px;">
      Very little text, no Scrollbar appearing
    </uui-scroll-container>
  `;

export const VeryWideContent: Story = () =>
  html`
    <uui-scroll-container style="width:400px; height:400px;">
      line is way toooo long
      WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY<br />
    </uui-scroll-container>
  `;
